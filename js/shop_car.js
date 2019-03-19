var shopCar = (function(){
    let $box,shopData;
    return {
        init($el){
            $box = $($el);
            this.getshopData()
            this.event();
        },
        event(){
            var self = this;
            $box.on('click','.shop-btn-del',function(){
                
                let index = $(this).index('.shop-btn-del')

                shopData.splice(index,1)
                self.insertData(shopData);
                self.setData()
            })
            $box.on('change','.shop-count',function(){
                var val =$(this).val() - 0;
                let index = $(this).index('.shop-count')
                shopData[index].count = val ;
                self.insertData(shopData);
                self.setData()

            })
        },
        getshopData(){
            var data = localStorage.ListData || '[]';
            // console.log(data)
            this.insertData(JSON.parse(data));
        },
        setData(){
            localStorage.ListData = JSON.stringify(shopData);
        },
        insertData(data){
            $box.html('');
            shopData = data;
            data.forEach(x => {
                let htmlFlat = `
                    <div>
                        商品名称:<span class="shop-name">${x.name}</span><br />
                        数量: <input class="shop-count" type="number" value="${x.count}" /><br />
                        价格: <span class="shop-price">${x.price}</span><br />
                        商品总价: <span class="shop-total">${x.price * x.count}</span><br />
                        商品提示: <span class="shop-tip">${x.ps}</span><br />
                        <button class="btn shop-btn-del">删除</button>
                    </div>`;
                $box.append(htmlFlat);
            });    
        }

    }
}())