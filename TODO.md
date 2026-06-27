# TODO

- [ ] Add immediate cart UI feedback when clicking “Add to Cart”:
  - [ ] Ensure a shared notification/toast state in `AppLayout` updates on `addToCart` without reload
  - [ ] Optionally listen for/dispatch `vibevault-cart-updated` event if used elsewhere
  - [ ] Add a small toast component in `AppLayout` and CSS for it
  - [ ] Wire `addToCart` to show toast and maybe pulse cart icon
- [ ] Test: verify cart count updates immediately and toast appears

