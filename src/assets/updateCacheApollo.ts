import {DataProxy} from "@apollo/client";

const updateCacheApollo = (cache: DataProxy, result: any) => {
  console.log('updateCacheApollo', cache, result)
}

export default updateCacheApollo