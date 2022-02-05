class ProductData{
    usersClicks = new Set();
    usersImpressions = new Set();
    constructor(productId){
        this.productId = productId;
        this.clicks = 0;
        this.impressions = 0;
        this.ctr = 0.0000;
    }

    addClick(user){
        if(!this.usersClicks.has(user)){
            this.usersClicks.add(user);
            this.clicks++;
            this.calculateCtr();
        }
       
    }

    addImpresions(user){
        if(!this.usersImpressions.has(user)){
            this.usersImpressions.add(user);
            this.impressions++;
            this.calculateCtr();
        }
    }

    calculateCtr(){
        if(this.impressions != 0 && this.clicks != 0){
            this.ctr = (this.clicks / this.impressions).toFixed(4)
        }else{
            this.ctr = (0).toFixed(4)
        }
    }

    
}

module.exports = ProductData;