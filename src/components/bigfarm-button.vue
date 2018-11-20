<style lang="scss">
.bigfarm__button {
  display: block;
  position: relative;
  font-size: 0.9375rem;
  height: 2.6875rem;
  z-index: 3;
  margin: 0.5rem 0.375rem 0.5rem 0.25rem;

  span {
    color: $bigfarm-brown;
    // white stroke and text shadow
    text-shadow: 1px 2.5px 0 #fff, 0 2.5px 0 #fff, -1px 2.5px 0 #fff, 1px -2.5px 0 #fff, 0 -2.5px 0 #fff, -1px -2.5px 0 #fff, 2px 2px 0 #fff, 2px 1px 0 #fff, 2px 0 0 #fff, 2px -1px 0 #fff, 2px -2px 0 #fff, 1px 2px 0 #fff, 1px 1px 0 #fff, 1px 0 0 #fff, 1px -1px 0 #fff, 1px -2px 0 #fff, 0 2px 0 #fff, 0 1px 0 #fff, 0 0 0 #fff, 0 -1px 0 #fff, 0 -2px 0 #fff, -1px 2px 0 #fff, -1px 1px 0 #fff, -1px 0 0 #fff, -1px -1px 0 #fff, -1px -2px 0 #fff, -2px 2px 0 #fff, -2px 1px 0 #fff, -2px 0 0 #fff, -2px -1px 0 #fff, -2px -2px 0 #fff, 1px 7px 0 $bigfarm-button-text-shadow, 0 7px 0 $bigfarm-button-text-shadow, -1px 7px 0 $bigfarm-button-text-shadow, 2px 6px 0 $bigfarm-button-text-shadow, 1px 6px 0 $bigfarm-button-text-shadow, 0 6px 0 $bigfarm-button-text-shadow, -1px 6px 0 $bigfarm-button-text-shadow, -2px 6px 0 $bigfarm-button-text-shadow, 2px 5px 0 $bigfarm-button-text-shadow, 1px 5px 0 $bigfarm-button-text-shadow, 0 5px 0 $bigfarm-button-text-shadow, -1px 5px 0 $bigfarm-button-text-shadow, -2px 4px 0 $bigfarm-button-text-shadow, 2px 3px 0 $bigfarm-button-text-shadow, 1px 3px 0 $bigfarm-button-text-shadow, 0 3px 0 $bigfarm-button-text-shadow, -1px 3px 0 $bigfarm-button-text-shadow, -2px 3px 0 $bigfarm-button-text-shadow, -1.5px 5.5px 0 $bigfarm-button-text-shadow, 1.5px 5.5px 0 $bigfarm-button-text-shadow;
    z-index: 7;
    display: block;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    &::after {
      content: '';
      display: block;
      width: 0.5rem;
      height: 0.125rem;
      // little glow
      background: $bigfarm-button-highlight;
      position: absolute;
      z-index: 8;
      right: 3.5px;
      top: 2.5px;
      border-radius: 50%;
      transform: rotateZ(30deg);
    }
  }

  .bigfarm__button_candy {
    color: #fff;
    // base fill
    background: linear-gradient(180deg, $bigfarm-button-gradient1-p1 0%, $bigfarm-button-gradient1-p2 100%);
    border-radius: 13px;
    // button border, stays constant
    border: 1px solid $bigfarm-button-border;
    // bottom bevel
    box-shadow: inset 0 -1.5px $bigfarm-button-inner-shadow;
    position: absolute;
    z-index: 5;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 1px;
      bottom: 48%;
      left: 3px;
      right: 3px;
      // big glossy reflection
      background: linear-gradient(180deg, $bigfarm-button-gradient2-p1 0%, $bigfarm-button-gradient2-p2 100%);
      border-radius: 1rem 1rem 50% 50% / 35% 35% 65% 65%;
      z-index: 6;
    }
  }

  .bigfarm__button_shadow,
  &::after {
    // hard shadow below button
    content: '';
    display: block;
    position: absolute;
    background: $bigfarm-button-shadow;
    bottom: -4.5px;
    border-radius: 13px;
    top: 4.5px;
    right: 0;
    left: -3px;
    z-index: 4;
  }

  &:hover {
    span::after {
      background: $bigfarm-button-highlight-hover;
    }

    .bigfarm__button_candy {
      background: linear-gradient(180deg, $bigfarm-button-gradient1-p1-hover 0%, $bigfarm-button-gradient1-p2-hover 100%);
      box-shadow: inset 0 -1.5px $bigfarm-button-inner-shadow-hover;

      &::before {
        background: linear-gradient(180deg, $bigfarm-button-gradient2-p1-hover 0%, $bigfarm-button-gradient2-p2-hover 100%);
      }
    }
  }

  &:active,
  &.active {
    span::after {
      background: transparent;
    }

    .bigfarm__button_candy {
      background: linear-gradient(180deg, $bigfarm-button-gradient1-p1-active 0%, $bigfarm-button-gradient1-p2-active 100%);
      box-shadow: inset 0 -1.5px $bigfarm-button-inner-shadow-bottom-active, inset 0 1.5px $bigfarm-button-inner-shadow-top-active;

      &::before {
        background: transparent;
      }
    }
  }

  &.disabled,
  &.disabled:hover,
  &.disabled:active {
    span { opacity: 0.4 }

    span::after {
      background: transparent;
    }

    .bigfarm__button_candy {
      background: linear-gradient(180deg, $bigfarm-button-gradient1-p1-hover 0%, $bigfarm-button-gradient1-p2-hover 100%);

      &::before {
        background: transparent;
      }
    }

    .bigfarm__button_shadow {
      opacity: 0.7;
    }
  }
}

// orange button
.bigfarm__button_orange {
  span {
    text-shadow: 1px 2.5px 0 #fff, 0 2.5px 0 #fff, -1px 2.5px 0 #fff, 1px -2.5px 0 #fff, 0 -2.5px 0 #fff, -1px -2.5px 0 #fff, 2px 2px 0 #fff, 2px 1px 0 #fff, 2px 0 0 #fff, 2px -1px 0 #fff, 2px -2px 0 #fff, 1px 2px 0 #fff, 1px 1px 0 #fff, 1px 0 0 #fff, 1px -1px 0 #fff, 1px -2px 0 #fff, 0 2px 0 #fff, 0 1px 0 #fff, 0 0 0 #fff, 0 -1px 0 #fff, 0 -2px 0 #fff, -1px 2px 0 #fff, -1px 1px 0 #fff, -1px 0 0 #fff, -1px -1px 0 #fff, -1px -2px 0 #fff, -2px 2px 0 #fff, -2px 1px 0 #fff, -2px 0 0 #fff, -2px -1px 0 #fff, -2px -2px 0 #fff, 1px 7px 0 $bigfarm-button-orange-text-shadow, 0 7px 0 $bigfarm-button-orange-text-shadow, -1px 7px 0 $bigfarm-button-orange-text-shadow, 2px 6px 0 $bigfarm-button-orange-text-shadow, 1px 6px 0 $bigfarm-button-orange-text-shadow, 0 6px 0 $bigfarm-button-orange-text-shadow, -1px 6px 0 $bigfarm-button-orange-text-shadow, -2px 6px 0 $bigfarm-button-orange-text-shadow, 2px 5px 0 $bigfarm-button-orange-text-shadow, 1px 5px 0 $bigfarm-button-orange-text-shadow, 0 5px 0 $bigfarm-button-orange-text-shadow, -1px 5px 0 $bigfarm-button-orange-text-shadow, -2px 4px 0 $bigfarm-button-orange-text-shadow, 2px 3px 0 $bigfarm-button-orange-text-shadow, 1px 3px 0 $bigfarm-button-orange-text-shadow, 0 3px 0 $bigfarm-button-orange-text-shadow, -1px 3px 0 $bigfarm-button-orange-text-shadow, -2px 3px 0 $bigfarm-button-orange-text-shadow, -1.5px 5.5px 0 $bigfarm-button-orange-text-shadow, 1.5px 5.5px 0 $bigfarm-button-orange-text-shadow;
  }

  span::after {
    // small highlight
    background: $bigfarm-button-orange-highlight;
  }

  .bigfarm__button_candy {
    // base fill
    background: linear-gradient(180deg, $bigfarm-button-orange-gradient1-p1 0%, $bigfarm-button-orange-gradient1-p2 100%);

    // bottom border
    box-shadow: inset 0 -1.5px $bigfarm-button-orange-inner-shadow;

    &::before {
      // big glossy reflection
      background: linear-gradient(180deg, $bigfarm-button-orange-gradient2-p1 0%, $bigfarm-button-orange-gradient2-p2 100%);
    }
  }

  &:hover {
    span::after {
      background: $bigfarm-button-orange-highlight-hover;
    }

    .bigfarm__button_candy {
      background: linear-gradient(180deg, $bigfarm-button-orange-gradient1-p1-hover 0%, $bigfarm-button-orange-gradient1-p2-hover 100%);
      box-shadow: inset 0 -1.5px $bigfarm-button-orange-inner-shadow-hover;

      &::before {
        background: linear-gradient(180deg, $bigfarm-button-orange-gradient2-p1-hover 0%, $bigfarm-button-orange-gradient2-p2-hover 100%);
      }
    }
  }

  &:active,
  &.active {
    span::after {
      background: transparent;
    }

    .bigfarm__button_candy {
      background: linear-gradient(180deg, $bigfarm-button-orange-gradient1-p1-active 0%, $bigfarm-button-orange-gradient1-p2-active 100%);
      box-shadow: inset 0 -1.5px $bigfarm-button-orange-inner-shadow-bottom-active, inset 0 1.5px $bigfarm-button-orange-inner-shadow-top-active;

      &::before {
        background: transparent;
      }
    }
  }

  &.disabled,
  &.disabled:hover,
  &.disabled:active {
    span { opacity: 0.4 }

    span::after {
      background: transparent;
    }

    .bigfarm__button_candy {
      background: linear-gradient(180deg, $bigfarm-button-orange-gradient1-p1-hover 0%, $bigfarm-button-orange-gradient1-p2-hover 100%);

      &::before {
        background: transparent;
      }
    }

    .bigfarm__button_shadow {
      opacity: 0.7;
    }
  }
}

// green button
.bigfarm__button_green {
  span {
    text-shadow: 1px 2.5px 0 #fff, 0 2.5px 0 #fff, -1px 2.5px 0 #fff, 1px -2.5px 0 #fff, 0 -2.5px 0 #fff, -1px -2.5px 0 #fff, 2px 2px 0 #fff, 2px 1px 0 #fff, 2px 0 0 #fff, 2px -1px 0 #fff, 2px -2px 0 #fff, 1px 2px 0 #fff, 1px 1px 0 #fff, 1px 0 0 #fff, 1px -1px 0 #fff, 1px -2px 0 #fff, 0 2px 0 #fff, 0 1px 0 #fff, 0 0 0 #fff, 0 -1px 0 #fff, 0 -2px 0 #fff, -1px 2px 0 #fff, -1px 1px 0 #fff, -1px 0 0 #fff, -1px -1px 0 #fff, -1px -2px 0 #fff, -2px 2px 0 #fff, -2px 1px 0 #fff, -2px 0 0 #fff, -2px -1px 0 #fff, -2px -2px 0 #fff, 1px 7px 0 $bigfarm-button-green-text-shadow, 0 7px 0 $bigfarm-button-green-text-shadow, -1px 7px 0 $bigfarm-button-green-text-shadow, 2px 6px 0 $bigfarm-button-green-text-shadow, 1px 6px 0 $bigfarm-button-green-text-shadow, 0 6px 0 $bigfarm-button-green-text-shadow, -1px 6px 0 $bigfarm-button-green-text-shadow, -2px 6px 0 $bigfarm-button-green-text-shadow, 2px 5px 0 $bigfarm-button-green-text-shadow, 1px 5px 0 $bigfarm-button-green-text-shadow, 0 5px 0 $bigfarm-button-green-text-shadow, -1px 5px 0 $bigfarm-button-green-text-shadow, -2px 4px 0 $bigfarm-button-green-text-shadow, 2px 3px 0 $bigfarm-button-green-text-shadow, 1px 3px 0 $bigfarm-button-green-text-shadow, 0 3px 0 $bigfarm-button-green-text-shadow, -1px 3px 0 $bigfarm-button-green-text-shadow, -2px 3px 0 $bigfarm-button-green-text-shadow, -1.5px 5.5px 0 $bigfarm-button-green-text-shadow, 1.5px 5.5px 0 $bigfarm-button-green-text-shadow;
  }

  span::after {
    // small highlight
    background: $bigfarm-button-green-highlight;
  }

  .bigfarm__button_candy {
    // base fill
    background: linear-gradient(180deg, $bigfarm-button-green-gradient1-p1 0%, $bigfarm-button-green-gradient1-p2 100%);

    // bottom border
    box-shadow: inset 0 -1.5px $bigfarm-button-green-inner-shadow;

    &::before {
      // big glossy reflection
      background: linear-gradient(180deg, $bigfarm-button-green-gradient2-p1 0%, $bigfarm-button-green-gradient2-p2 100%);
    }
  }

  &:hover {
    span::after {
      background: $bigfarm-button-green-highlight-hover;
    }

    .bigfarm__button_candy {
      background: linear-gradient(180deg, $bigfarm-button-green-gradient1-p1-hover 0%, $bigfarm-button-green-gradient1-p2-hover 100%);
      box-shadow: inset 0 -1.5px $bigfarm-button-green-inner-shadow-hover;

      &::before {
        background: linear-gradient(180deg, $bigfarm-button-green-gradient2-p1-hover 0%, $bigfarm-button-green-gradient2-p2-hover 100%);
      }
    }
  }

  &:active,
  &.active {
    span::after {
      background: transparent;
    }

    .bigfarm__button_candy {
      background: linear-gradient(180deg, $bigfarm-button-green-gradient1-p1-active 0%, $bigfarm-button-green-gradient1-p2-active 100%);
      box-shadow: inset 0 -1.5px $bigfarm-button-green-inner-shadow-bottom-active, inset 0 1.5px $bigfarm-button-green-inner-shadow-top-active;

      &::before {
        background: transparent;
      }
    }
  }

  &.disabled,
  &.disabled:hover,
  &.disabled:active {
    span { opacity: 0.4 }

    span::after {
      background: transparent;
    }

    .bigfarm__button_candy {
      background: linear-gradient(180deg, $bigfarm-button-green-gradient1-p1-hover 0%, $bigfarm-button-green-gradient1-p2-hover 100%);

      &::before {
        background: transparent;
      }
    }

    .bigfarm__button_shadow {
      opacity: 0.7;
    }
  }
}

.tinyfont .btn-secondary {
  font-size: 0.625rem;
  line-height: 0.75rem;
  min-height: 2.25rem;
}

.btn-secondary {
  background: $bigfarm-brown-light;
  color: $bigfarm-brown;
  white-space: normal;
  line-height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, $bigfarm-button-gradient-v2-01-p1 0%, $bigfarm-button-gradient-v2-01-p2 100%);
  box-shadow: inset 1px 1px 0 $bigfarm-brown-light, inset -1px -1px 0 $bigfarm-brown-dark, 1px 1px 0 $bigfarm-brown-light, -1px -1px 0 $bigfarm-brown-dark;
  border: none;

  &:hover {
    background: linear-gradient(0deg, $bigfarm-button-gradient-v2-01-p3 0%, $bigfarm-button-gradient-v2-01-p4 100%);
    color: $bigfarm-brown;
  }

  &.active,
  &:active {
    background: linear-gradient(180deg, $bigfarm-button-gradient-v2-01-p5 0%, $bigfarm-button-gradient-v2-01-p6 100%);
    color: $bigfarm-brown !important;
  }
}
</style>
