var shopList = (function(){
    let $box,shopData;
    return {
        init($el){
            $box = $($el);
            this.getshopData()
            this.event();
        },
        event(){
            var self = this;
            $box.on('click','.shop-btn-car',function(){
                let index = $(this).index('.shop-btn-car')
                shopData[index].count = $(this).siblings('.shop-count').val() - 0;
                self.setData(shopData[index])
            })
        },
        getshopData(){
            $.getJSON('json/shop.json',this.insertData.bind(this))
        },
        setData(data){
            let ListData = localStorage.ListData || '[]';
            let flag = true;
            
            ListData = JSON.parse(ListData);
            for(var i = 0;i<ListData.length;i++){
                if(data.id == ListData[i].id){
                    ListData[i].count += data.count;
                    flag = false;
                    break;
                }
            }
            if(flag){
                ListData.push(data);
            }
            
            localStorage.ListData = JSON.stringify(ListData);
        },
        insertData({data}){
            shopData = data;
            data.forEach(x => {
                let htmlFlat = `
                <div data-id='${x.id}'>
                    商品名称:<span class="shop-name">${x.name}</span><br />
                    数量: <input class="shop-count" type="number"  value="1" /><br />
                    价格: <span class="shop-price">${x.price}</span><br />
                    <button class="btn shop-btn-car">加入购物车</button>
                </div>`;
                $box.append(htmlFlat);
            });    
        }

    }
}())