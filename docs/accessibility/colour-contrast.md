# Colour contrast and vision

Poor contrast slows decisions and raises error rates, especially in dense, data-heavy interfaces. Colour choices also need to work for people with colour vision deficiency (CVD).

## How we judge contrast

- **APCA** is the primary tool for tuning colours. It accounts for font size, weight, and light or dark polarity.
- **WCAG 2.2** is the compliance floor. If it fails, the colour must change.
- If WCAG 2.2 passes but APCA still shows poor readability, improve the colour rather than treating compliance as enough.

## Do

- Use the theme tokens and roles (`--ds-*`) rather than picking colours by hand.
- Test text across sizes, weights, and both light and dark modes.
- Pair colour with text, an icon, or a label. Icons should differ in shape, not just colour.
- Keep disabled states distinguishable without making them unreadable. WCAG 2.2 exempts disabled controls from contrast minimums, but we still aim for legible text.
- Use subtle text only for non-essential information.

## Watch out for

- Status colours (`--ds-success`, `--ds-warning`, `--ds-danger`). Saturated colours can pass WCAG and still vibrate or feel muddy, and they fall in the red-green range that the most common types of CVD compress together.
- Status colours placed side by side, such as a legend or results table. Check them in a CVD simulator, not just by eye.
- Reducing contrast for visual subtlety where meaning is still needed.
- Assuming light and dark mode need the same values.

## Learn more

- [APCA (Advanced Perceptual Contrast Algorithm)](https://git.apcacontrast.com/documentation/APCAeasyIntro)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Coblis (colour blindness simulator)](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- [WCAG 3 (W3C Working Draft)](https://www.w3.org/TR/wcag-3.0/)
