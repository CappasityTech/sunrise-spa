import axios from 'axios';
import config from '../../sunrise.config';

export default {
  mounted() {
    if (config.ct.cappasityOwner && this.sku) {
      axios(`https://api.cappasity.com/api/files/info/${config.ct.cappasityOwner}/${this.sku}`)
        .then(() => {
          // TODO add data
        })
        .catch(() => {
          // TODO do not use cappasity integration
        });
    }
  },
};
