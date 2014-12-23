define(['./DataSource'], function(DataSource) {
  var basePath = 'stability';

  var StabilityDS = DataSource.ext({
    chart: function(params) {
      return this._load(basePath + '/chart', {
        params: params
      });
    }
  });
  return {
    __register__: function(mod) {
      mod.service('ds.stability', StabilityDS);
      return mod;
    }
  };
})
