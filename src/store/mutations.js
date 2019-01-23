export default  {
    //mutations 要操作改变store中的state的数据 要在这里先声明方法 再去组件中调用
    addToCar(state,appshopCar){
        //1.将商品加入购物车时 如果商品已经存在，则count数量上加；如果商品不存在，则push进去
        //2.循环之前，先假设没有找到同个id的商品
        //state.car.push(appshopCar)
        var isFound = false
        //3.循环car判断
        state.car.some(item=>{
            if(item.id == appshopCar.id){
                //说明同一个id 的商品已存在
                item.count += parseInt(appshopCar.count)
                isFound = true
                return true
            }
        })
        if(!isFound){
            state.car.push(appshopCar)
        }
        //4.将car购物车信息存储到本地,键 值的形式
        localStorage.setItem('car',JSON.stringify(state.car))

    },
    updateGoodsSelected(state,appshopCar){
        state.car.some(item=>{
            if(item.id == appshopCar.id){
                item.selected = appshopCar.selected
                return true
            }
        })
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateCarInfo(state,appshopCar){
        state.car.some(item=>{
            if(item.id == appshopCar.id){
                item.count = appshopCar.count
                return true
            }
        }),
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeCarCount(state,id){
        state.car.some(item=>{
            if(item.id == id){
                state.car.splice(i,1)
                return true
            }
        }),
        localStorage.setItem('car',JSON.stringify(state.car))
    }
}