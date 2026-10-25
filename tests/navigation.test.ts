import { test } from 'node:test';
import assert from 'node:assert/strict';
import { swipeTarget, isAtPageBottom } from '../lib/navigation.ts';

test('horizontal dock swipes choose neighbouring pages', () => {
  assert.equal(swipeTarget(0, -85, 10, 4), 1);
  assert.equal(swipeTarget(3, 85, 10, 4), 2);
});

test('small taps and vertical scroll gestures do not navigate', () => {
  assert.equal(swipeTarget(1, 20, 0, 4), 1);
  assert.equal(swipeTarget(1, 70, 120, 4), 1);
});

test('dock navigation stays within first and last tabs', () => {
  assert.equal(swipeTarget(0, 90, 0, 4), 0);
  assert.equal(swipeTarget(3, -90, 0, 4), 3);
});

test('detects when viewport reaches the bottom of the page', () => {
  assert.equal(isAtPageBottom(1200, 800, 2000), true);
  assert.equal(isAtPageBottom(1197, 800, 2000), true);
  assert.equal(isAtPageBottom(900, 800, 2000), false);
});
