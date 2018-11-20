<style lang="scss">
@import "@/assets/scss/common/_variables.scss";
@import "~bootstrap/scss/mixins/_gradients.scss";

.bigfarm .modal {
  .modal-dialog {
    background-image:
      url('../assets/images/bigfarm__wood_1.svg'),
      linear-gradient(-90deg,
        $bigfarm-gradient-beige-dark-p2,
        $bigfarm-gradient-beige-dark-p1
      );
    background-size: cover;

    box-shadow:
      1px 1px 0 #593200,
      -1px 1px 0 #593200,
      1px -1px 0 #593200,
      -1px -1px 0 #593200;

    border: 1px solid transparent;
    border-radius: $bigfarm-window-border-radius;
    position: relative;
    border-image: linear-gradient(
      0deg,
      $bigfarm-gradient-window-bevel-light-p1 0%,
      $bigfarm-gradient-window-bevel-light-p2 77%,
      $bigfarm-gradient-window-bevel-light-p3 100%
    );
    border-image-slice: 1;
  }

  .modal-content {
    background-image:
      url('../assets/images/bigfarm__wood_1.svg'),
      linear-gradient(
        -45deg,
        $bigfarm-gradient-beige-light-p2,
        $bigfarm-gradient-beige-light-p1
      );
    background-size: cover;
    background-image: url('../assets/images/bigfarm__wood_1.svg'), linear-gradient(-45deg, $bigfarm-gradient-beige-light-p2, $bigfarm-gradient-beige-light-p1);
    background-size: cover;
    background-color: transparent;
    box-shadow: inset -1px -1px 0 #ffc85b, inset 2px 2px 0 $bigfarm-window-inner-shadow, inset -2px -2px 0 $bigfarm-window-inner-shadow;
    border: 0;
    border-radius: 0 0 $bigfarm-window-border-radius/3*2 $bigfarm-window-border-radius/3*2;


    .modal-header {
      background-image:
        url('../assets/images/bigfarm__wood_1.svg'),
        linear-gradient(-90deg,
          $bigfarm-gradient-beige-dark-p2,
          $bigfarm-gradient-beige-dark-p1
        );
      background-size: cover;
      border: none;
    }
  }
}

.bigfarm .card {
  border: none;
  background-color: transparent;
  border-radius: $bigfarm-border-radius;
  padding: $bigfarm-border-width-inner + 1px;
  margin: -$bigfarm-border-width-inner - 1px 1px 1px;
  position: relative; // xredundant in .active
  box-shadow:
    inset 1px 1px 0 $bigfarm-brown-light,
    inset -1px -1px 0 $bigfarm-brown-dark,
    1px 1px 0 $bigfarm-brown-light,
    -1px -1px 0 $bigfarm-brown-dark;

  @include gradient-y($start-color: $bigfarm-gradient-p1, $end-color: $bigfarm-gradient-p2, $start-percent: 0%, $end-percent: 100%);
}

/*-----*/

.bigfarm__button {
  cursor: pointer;

  display: block;
  position: relative;
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

  .bigfarm__button_shadow {
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
    cursor: default;
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

.bigfarm {
  .close {
    opacity: 1;

    span {
      background-image: url(../assets/images/bigfarm__close_button.svg);
      background-repeat: no-repeat;
      background-size: cover;

      width: 32px;
      height: 32px;

      display: inline-block;

      color: transparent;
      text-shadow: none;
    }

    &:not(:disabled):not(.disabled):hover,
    &:not(:disabled):not(.disabled):focus {
      opacity: 1;
    }
  }
}

</style>

<template>
  <div class="bigfarm__overlay bigfarm d-flex justify-content-center align-items-center">
    <div class="modal position-relative" :class="{'d-none': !canShow, 'd-block': canShow}" tabindex="-1" role="dialog">
      <div class="modal-dialog  mt-0 mb-0" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{
                t(isExpired
                  ? 'subscription_expiredDialogue_header'
                  : 'subscription_confirmationDialogue_header'
                )
              }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeWindow()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="card">
              <h5 class="card-title text-center mb-1">{{ packageTitle }}</h5>
              <img class="card-img-top" :src="heroImageUrl" alt="Card image cap">
              <div class="card-body">
                <h1><strong>{{ dialogHeader }}</strong></h1>
                <p>{{ dialogBody }}</p>
              </div>

              <div class="bigfarm__shade_brown d-flex justify-content-center" style="margin: -5px; border-bottom-left-radius: inherit; border-bottom-right-radius: inherit">
                <div class="w-50">
                  <a class="bigfarm__button bigfarm__button_green" @click="closeWindow()">
                      <div class="bigfarm__button_candy"><span>Okay</span></div>
                      <div class="bigfarm__button_shadow"></div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
function isTrue(str) {
  return /^true|1$/i.test(str)
}

;(function parseWindowLocationQuery(w){
  var d=decodeURIComponent,
      q=w.location.query=w.location.query||{},
      pairs=w.location.search.substr(1).split('&'),
      i;
  while(i=pairs.pop()) {
    var keyValue=i.match(/([^=]*)=?(.*)/)
    if(keyValue) q[d(keyValue[1]).toLowerCase()]=d(keyValue[2]);
  }
})(window);

export default {
  name: 'StatusChangedModal',

  data: () => ({
    apiBaseUrl: 'https://4zleckep5b.execute-api.eu-west-1.amazonaws.com',
    deploymentStage: 'staging',
    ping: {
      gameId: window.location.query.gameid || 15,
      networkId: window.location.query.networkid || 1,
      instanceId: window.location.query.instanceid || 251,
      playerId: window.location.query.playerid || 2794098
    },
    sessionId: window.location.query.sid || Math.random().toString(36).substr(2),

    locale: window.location.query.language || window.location.query.locale || 'en',
    isRenewed: isTrue(window.location.query.isrenewed) || false,
    isExpired: isTrue(window.location.query.isexpired) || false,
    isPlayerSubscription: isTrue(window.location.query.playersubscription) || false,
    isAllianceSubscription: isTrue(window.location.query.alliancesubscription) || false,
    time: window.location.query.time || 0,

    allianceSubscription: {},
    text: {}
  }),

  computed: {
    canShow() {
      return Object.keys(this.text).length > 0
    },

    catalogUrl() {
      return [
        this.apiBaseUrl,
        this.deploymentStage,
        this.ping.gameId,
        this.ping.networkId,
        this.ping.instanceId,
        this.ping.playerId
      ].join('/')+`?sid=${this.sessionId}&locale=${this.locale}`
    },

    heroImageUrl() {
      return this.isPlayerSubscription
        ? require('@/assets/images/hero-individualSubscription.jpg')
        : require('@/assets/images/hero-allianceSubscription.jpg')
    },

    packageTitle() {
      return this.t(
        this.isPlayerSubscription
          ? 'subscription_packageConvenience_title'
          : 'subscription_packageAlliance_title'
      )
    },

    dialogHeader() {
      return this.t(this.isExpired
        ? 'subscription_expiredDialogue_header'
        : 'subscription_confirmationDialogue_header'
      )
    },

    dialogBody() {
      const EXPIRED = true
      const CONFIRMED = false
      const PLAYER = true
      const ALLIANCE = false

      const {isPlayerSubscription, expired} = this
      const remainingTexts = [
        [PLAYER, EXPIRED, 'subscription_expiredDialogue_player_copy'],
        [PLAYER, CONFIRMED, 'subscription_confirmationDialogue_player_desc'],
        [ALLIANCE, EXPIRED, 'subscription_expiredDialogue_allianceNone_desc', 0],
        [ALLIANCE, EXPIRED, 'subscription_expiredDialogue_allianceSingular_copy', 1]
        [ALLIANCE, EXPIRED, 'subscription_expiredDialogue_alliance_copy'],
        [ALLIANCE, CONFIRMED, 'subscription_confirmationDialogue_allianceSingular_desc', 1],
        [ALLIANCE, CONFIRMED, 'subscription_confirmationDialogue_alliance_desc'],
      ]

      if(this.isPlayerSubscription) return this.t(
          this.isExpired
          ? 'subscription_expiredDialogue_player_copy'
          : 'subscription_confirmationDialogue_player_desc'
        , this.packageTitle
      )

      const memberCount = this.allianceSubscription.allianceSubscriberCount || 0
      if(!this.isExpired) return this.t(
        memberCount === 1
        ? 'subscription_confirmationDialogue_allianceSingular_desc'
        : 'subscription_confirmationDialogue_alliance_desc'
      , this.packageTitle, memberCount
      )

      return this.t(
        memberCount === 0
          ? 'subscription_expiredDialogue_allianceNone_desc'
          : memberCount === 1
          ? 'subscription_expiredDialogue_allianceSingular_copy'
          : 'subscription_expiredDialogue_alliance_copy'
        , this.packageTitle, memberCount
      )
    },

    expiredConfirmationHeader() {
      return
    }
  },

  methods: {
    t(id, ...args) {
      const text = (args || []).reduce((result, arg, index) => {
        return result.replace(new RegExp(`\\{${index}\\}`, 'g'), arg)
      }, this.text[id] || id)
      return text
    },

    closeWindow() {
      window.parent.postMessage({
        name: 'cxf.subscriptions.close',
        frameId: window.location.query.elementid
      }, '*');
    }
  },

  created() {
    fetch(this.catalogUrl)
      .then(response => response.json())
      .then(subscriptionData => {
        this.text = subscriptionData.i18n
        this.allianceSubscription = subscriptionData.payoutTypes.find(({id}) => id === 'allianceSubscription')
      })
  }
}
</script>
