/*
Inputs
付款方式: paymentOption? rInstantPayment/rDelayedPayment
商品金額: productAmount
訂單金額: listPrice
運費金額: shippingAmount
店家折扣: sellerDiscount
Pinkoi 負擔之紅利: pinkoiBonus
Pinkoi 負擔之折抵: pinkoiDiscount

Displays
訂單金額: orderTotal
定價金額: listPrice
未稅管理費: feeBeforeTax
含稅管理費: feeAfterTax
實收金額: Remittance
利潤率: profitRate
金流費攤分: bankingCharge

Radio Inputs:
disableSellerDiscount
disablePinkoiDiscount
disablePinkoiBonus
*/


function FeeCtrl($scope) {

  $scope.isValid = function(handle) {
  	return (typeof handle) != 'undefined' && handle;
  }
    
  $scope.profitRate = "0%";
  $scope.disableSellerDiscount = false;
  $scope.disablePinkoiBonus = false;
  $scope.disablePinkoiDiscount = false;
  $scope.discountType = "none";
  
  $scope.change = function() {
  	var inputReady = false;
    var Totalfee = 0;
    var credit, mart = 0;
    var delayedPayment = $scope.paymentOption == "rDelayedPayment" ? true : false;
        
    if (this.isValid(this.sellerDiscount)) this.disablePinkoiBonus = true, this.disablePinkoiDiscount = true, this.discountType = "sellerDiscount";
    if (this.isValid(this.pinkoiBonus)) this.disableSellerDiscount = true, this.disablePinkoiDiscount = true, this.discountType = "pinkoiBonus";
    if (this.isValid(this.pinkoiDiscount)) this.disableSellerDiscount = true, this.disablePinkoiBonus = true, this.discountType = "pinkoiDiscount";
    if (!this.isValid(this.sellerDiscount) && !this.isValid($scope.pinkoiBonus) && !this.isValid($scope.pinkoiDiscount))
    	this.disableSellerDiscount = false, this.disablePinkoiDiscount = false, this.disablePinkoiBonus = false, this.discountType = "none";
    
    
    // TODO check inputs
    // if inputReady
    
    this.delayedCharge = delayedPayment ? 15: 0;
  	
    switch (this.discountType) {
    	case "sellerDiscount":
    	  this.orderTotal = this.productAmount + this.shippingAmount + this.delayedCharge;
    	  this.listPrice = Math.round(this.productAmount / (100-this.sellerDiscount) * 100) + this.shippingAmount;
    	  this.feeBeforeTax = (delayedPayment ? Math.round((this.listPrice - this.shippingAmount) * .1 + 15) : 
    		Math.round((this.listPrice) * .15 + 10));
    	break;
    	case "pinkoiDiscount":
    	  this.orderTotal = this.productAmount + this.shippingAmount + this.delayedCharge;
    	  this.listPrice = this.productAmount + this.pinkoiDiscount + this.shippingAmount;
    	  this.feeBeforeTax = (delayedPayment ? Math.round((this.listPrice - this.shippingAmount) * .1 + 15) : 
    		Math.round((this.listPrice) * .15 + 10)) - this.pinkoiDiscount;
    	break;
    	case "pinkoiBonus":
    	  this.orderTotal = this.productAmount + this.shippingAmount + this.delayedCharge - this.pinkoiBonus;
    	  this.listPrice = this.productAmount + this.shippingAmount;
    	  this.feeBeforeTax = (delayedPayment ? Math.round(this.productAmount * .1 + 15) : 
    		Math.round((this.productAmount + this.shippingAmount) * .15 + 10)) - this.pinkoiBonus;
    	break;
    	case "none":
    	  this.orderTotal = this.productAmount + this.shippingAmount + this.delayedCharge;
    	  this.listPrice = this.productAmount + this.shippingAmount;
    	  this.feeBeforeTax = delayedPayment ? Math.round(this.productAmount * .1 + 15) : 
    		Math.round((this.productAmount + this.shippingAmount) * .15 + 10);
    	break;
    	default:
    	break;    	
    }
  	
	this.feeAfterTax = Math.round(this.feeBeforeTax * 1.05);
    this.bankingCharge = Math.round(this.orderTotal / 6000 * 45);
    this.Remittance = this.orderTotal - this.feeAfterTax - this.bankingCharge - this.delayedCharge;
    this.profitRate = Math.round((this.Remittance / this.listPrice) * 100) + '%';

  }

}

