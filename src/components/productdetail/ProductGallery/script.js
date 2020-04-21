import gql from 'graphql-tag';
import axios from 'axios';
import config from '../../../../sunrise.config';

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  mounted() {
    if (config.ct.cappasityBearer && this.sku) {
      axios({
        method: 'post',
        url: 'https://api.cappasity.com/api/files/embed',
        headers: { Authorization: `Bearer ${config.ct.cappasityBearer}` },
        data: {
          data: {
            id: '1333',
            type: 'embed',
            attributes: {
              width: 100,
              height: 250,
              autorun: true,
              closebutton: false,
              hidecontrols: false,
              logo: false,
              hidefullscreen: false,
            },
          },
        },
      })
        .then(({ data: { data: innerHTML } }) => {
          this.$refs.cappasityIntegration.innerHTML = innerHTML;
          this.cappasityData = {
            iframe: this.$refs.cappasityIntegration.firstChild,
            loaded: true,
          };

          const cappasitiAi = document.createElement('script');
          cappasitiAi.src = 'https://api.cappasity.com/api/player/cappasity-ai';
          this.$refs.cappasityIntegration.appendChild(cappasitiAi);
        })
        .catch(() => {
          this.cappasityData = {
            loaded: true,
          };
        });
    } else {
      this.cappasityData = {
        loaded: true,
      };
    }
  },
  updated() {
    const { productZoomer } = this.$refs;
    if (productZoomer !== undefined) {
      // TODO handle change
    }
  },
  data: () => ({
    product: null,
    cappasityData: {
      iframe: null,
      loaded: false,
    },
  }),
  computed: {
    show() {
      return this.product !== null && this.cappasityData.loaded;
    },
    productImages() {
      const { images } = this.product.masterData.current.variant;
      return this.cappasityData.iframe
        ? [{ url: '/img/cappasity3d.png', isCapp3D: true }, ...images]
        : images;
    },
    zoomerImages() {
      const imageInfos = this.productImages.map((image, index) => ({
        id: index,
        url: image.url,
        isCapp3D: image.isCapp3D,
      }));
      return {
        thumbs: imageInfos,
        normal_size: imageInfos,
        large_size: imageInfos,
      };
    },
    zoomerOptions() {
      return {
        zoomFactor: 4,
        pane: 'pane',
        hoverDelay: 300,
        namespace: 'product-gallery',
        move_by_click: true,
        scroll_items: this.galleryThumbnailsCount,
        choosed_thumb_border_color: '#FEC14E',
      };
    },
    galleryThumbnailsCount() {
      return Math.min(this.productImages.length, 3);
    },
  },
  apollo: {
    product: {
      query: gql`
        query ProductGallery($sku: String!) {
          product(sku: $sku) {
            id
            masterData {
              current {
                variant(sku: $sku) {
                  sku
                  images {
                    url
                  }
                }
              }
            }
          }
        }`,
      variables() {
        return {
          sku: this.sku,
        };
      },
    },
  },
};
