#!/usr/bin/env bash
# Packs the built package as a real consumer would install it, then runs
# throwaway Vitest suites against the tarball (not repo source) in each
# e2e/consumer-smoke-* fixture. Catches build-only breakage (e.g.
# bundling/minifying a dependency in a way that only fails once evaluated by
# a consumer's own tooling) that source-only tests never touch.
#
# Fixtures:
#   consumer-smoke              - current/floating Vitest, general build health
#   consumer-smoke-legacy-vitest - pinned to vitest 4.0.18 / vite 7.3.5, the
#                                  exact versions that hit the 0.7.1
#                                  SyntaxError-on-import bug (already fixed in
#                                  newer Vite/Vitest, so the floating fixture
#                                  alone can't catch a regression of it)
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

TARBALL_NAME="sci-react-ui.tgz"
FIXTURES=("e2e/consumer-smoke" "e2e/consumer-smoke-legacy-vitest")

# CI runs `pnpm build` in the step immediately before this script; skip a
# redundant rebuild there, but still build for a standalone/local run.
if [ ! -d dist ]; then
  pnpm build
fi

# esbuild's postinstall needs approving (pnpm blocks new dependency builds by
# default). With --ignore-workspace, pnpm re-reports the ignored-build
# warning (exit 1) on every install even after approving and installing
# successfully, so this only swallows that specific, known-benign failure —
# any other install error (network, integrity, lockfile) still aborts here
# with its real output, rather than surfacing later as a confusing
# "module not found" at the `pnpm test` step.
install_allowing_ignored_builds() {
  local fixture_dir="$1"
  local output
  if output=$(pnpm --dir "$fixture_dir" install --ignore-workspace --no-frozen-lockfile 2>&1); then
    echo "$output"
    return 0
  fi
  echo "$output"
  if ! echo "$output" | grep -q "ERR_PNPM_IGNORED_BUILDS"; then
    return 1
  fi
}

PACKED=$(pnpm pack --pack-destination . | tail -1)

for FIXTURE_DIR in "${FIXTURES[@]}"; do
  rm -f "$FIXTURE_DIR/$TARBALL_NAME"
  cp "$PACKED" "$FIXTURE_DIR/$TARBALL_NAME"
  install_allowing_ignored_builds "$FIXTURE_DIR"
  pnpm --dir "$FIXTURE_DIR" approve-builds --all || true
  install_allowing_ignored_builds "$FIXTURE_DIR"
  pnpm --dir "$FIXTURE_DIR" test
done

rm -f "$PACKED"
