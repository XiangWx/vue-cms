export default {
    totalCount(state){ //将car中的count属性累加 
        var totalCount = 0
        state.car.forEach(item=>{
            totalCount += item.count    
        })
        return totalCount
    },
    goodsCount(state) { //技巧，取出state.car数据里面的id，count 组合成新的对象
        var goodsCount = {}
        state.car.forEach(item=>{
            goodsCount[item.id] = item.count
        })
        return goodsCount
    },
    goodsSelected(state){
        var goodsSelected={}
        state.car.forEach(item=>{
            goodsSelected[item.id] = item.selected
        })
        return goodsSelected
    }

}