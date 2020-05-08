import gql from 'graphql-tag';
import cappasity from '../../../mixins/cappasity';

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  mixins: [cappasity],
  data: () => ({
    product: null,
  }),
  computed: {
    productImages() {
      const { images } = this.product.masterData.current.variant;
      return this.isCappasityModel
        ? [...images, { url: '/img/cappasity3d.jpg', isCapp3D: true }]
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
