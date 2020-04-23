import axios from 'axios';
import config from '../../sunrise.config';

// request to string iframe html element
const cappasityRequest = (sku) => {
  if (!config.ct.cappasityOwner && !sku) {
    throw Error('without cappasity');
  }
  const url = `https://3d.cappasity3d.com/u/${config.ct.cappasityOwner}/${sku}`;
  return axios('https://api.cappasity3d.com/api/oembed', { params: { url, format: 'json' } });
};
// this script is for better analytic
const cappasityAi = document.createElement('script');
cappasityAi.src = 'https://api.cappasity3d.com/api/player/cappasity-ai';

export default {
  data: () => ({
    isLoaded: false,
    isCappasityModel: false,

    cappasityIframeStyle: {
      display: 'none',
    },
  }),
  async mounted() {
    try {
      const { data: { html: innerHTML } } = await cappasityRequest(this.sku);
      const { cappasityIntegration } = this.$refs;

      cappasityIntegration.appendChild(cappasityAi);

      cappasityIntegration.innerHTML = innerHTML;
      cappasityIntegration.firstChild.style = `
            position: absolute;
            width: 100%;
            height: 100%;
          `;
      this.isCappasityModel = true;
    } finally {
      this.isLoaded = true;
    }
  },
  updated() {
    const { productZoomer } = this.$refs;
    if (productZoomer !== undefined) {
      if (productZoomer.choosedThumb.isCapp3D) {
        productZoomer.$el.firstChild.style = 'display: none;';
      } else {
        productZoomer.$el.firstChild.style = 'display: block;';
      }
      // Plugin method replacement :(
      productZoomer.chooseThumb = (thumb, event) => {
        const eventType = event.type;
        if (eventType === 'mouseover') {
          if (productZoomer.options.move_by_click !== true) {
            productZoomer.choosedThumb = thumb;
            productZoomer.$emit('chooseThumb', thumb);
          }
        } else {
          productZoomer.choosedThumb = thumb;
          productZoomer.$emit('chooseThumb', thumb);
        }
      };
    }
  },
  computed: {
    chooseThumbHandler() {
      return (thumb) => {
        if (thumb.isCapp3D) {
          this.cappasityIframeStyle = { display: 'block' };
        } else {
          setTimeout(() => {
            this.cappasityIframeStyle = { display: 'none' };
          }, 200);
        }
      };
    },
    show() {
      return this.product !== null && this.isLoaded;
    },
  },
};
