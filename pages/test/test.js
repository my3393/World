let ss = 0;
Page({
    
    data: {
        //户型   这是一个本地的对象，然后绑定到页面上
        pic_array: [
            { id: 13, name: '1室1厅1卫' },
            { id: 14, name: '1室2厅1卫' },
            { id: 15, name: '2室1厅1卫' },
            { id: 16, name: '3室1厅2卫' },
            { id: 17, name: '4室1厅2卫' },
            { id: 18, name: '5室1厅3卫' },
            { id: 19, name: '6室1厅3卫' },
            { id: 20, name: '7室以上' },
        ],
        hx_index: 0,
    },

    bindPickerChange_hx: function (e) {
        var that = this;
        console.log('picker发送选择改变，携带值为', e.detail);
        that.setData({   //给变量赋值
            hx_index: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
        })
        console.log('自定义值:', that.data.pic_array[e.detail.value].id);
        ss = 2;
        console.log(ss)
        
        
    },
    a: function () {
        if(ss == 2){
            console.log("askdhaskja")
        }
    },
})