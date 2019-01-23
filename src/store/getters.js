export default {
    totalCount(state){ //将car中的count属性累加 
        var totalCount = 0
        state.car.forEach(item=>{
            totalCount += parseInt(item.count)   
        })
        return totalCount
    },
    goodsCount(state) { //技巧，取出state.car数据里面的id，count 组合成新的对象
        var goodsCount = {}
        state.car.forEach(item=>{
            goodsCount[item.id] = parseInt(item.count)
        })
        return goodsCount  // { 88: 5, 90: 2 }
    },
    goodsSelected(state){ //记录商品的是否选中状态
        var goodsSelected={}
        state.car.forEach(item=>{
            goodsSelected[item.id] = item.selected
        })
        return goodsSelected  // { 88: true, 90: true }
    },
    goodsCountAndAmount(state){
        var obj ={
            count:0, //已经勾选的商品数量
            amount:0 //已经勾选的商品价格
        }
      
        state.car.forEach(item=>{ //结算部分需要的   被选中的商品数量和总价
            if(item.selected){
                obj.count += parseInt(item.count)
                obj.amount += item.count * item.price
            }
        })
        return obj
    }
   

}