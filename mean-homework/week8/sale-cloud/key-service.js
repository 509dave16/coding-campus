(function(){
  angular.module('KeyService',['angular-uuid','ngCookies'])
  .service('key',key);
  
  function key(uuid,$cookies)
  {
    this.get = function()
    {
      if(!$cookies.sale_cloud_id)
      {
        $cookies.sale_cloud_id = uuid.v1();
      }
      return $cookies.sale_cloud_id;
    };
  }
})();