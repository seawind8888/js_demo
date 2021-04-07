var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0;i<nums.length;i++){
        var cha = target - nums[i];
        if(map.has(cha)){
            return [map.get(cha),i]
        }else{
            map.set(nums[i],i)
        }
    }
    
};

console.log(twoSum([2,7,11,15], 9))