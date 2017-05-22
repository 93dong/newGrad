var CommonAjax = (function(){
    var serviceUrl="ss";
    var ajax = function(data){
        $.ajax({
            type : data.type ? data.type : 'POST',
            url : data.url ? data.url  : serviceUrl,
            data : data.params || {} ,
            cache: data.cache ? true : false,
            dataType : data.dataType ?  data.dataType : "json",
            traditional:true,
            success : function(returnData) {
                //data.successF(returnData);//请求成功
                var respCode=data.respCode || "0000";
                if(returnData.respCode == respCode){
                    if(data.successF){
                        data.successF(returnData);//请求成功
                    }else{
                        // layer.alert(returnData.respDesc,{icon:'success'});
                    }
                }else{
                    // layer.alert(returnData.respDesc,{icon:'error'});
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                if(data.errorF){
                    data.errorF(XMLHttpRequest, textStatus, errorThrown);
                }else{
                    //调用提示框组件，提示失败，在平台开发的时候进行补充
                    // layer.alert(returnData.respDesc,{icon:'success'});
                }
            }
        });
    };
    return {
        ajax:ajax
    }
})();