

function FeeCtrl($scope) {
  $scope.Total = 0;
  $scope.profitRate = "0%";
  $scope.isValid = function(handle) {
  	return (typeof handle) != 'undefined' && handle != null
  }
  $scope.change = function() {
    var Totalfee = 0;
    var credit, mart = 0;
    
    if ($scope.isValid($scope.Credit)){
      credit = $scope.Credit;
    }else
    {
      credit = 0;
    }

    if ((typeof $scope.Mart) != 'undefined' && $scope.Mart != null) {
      mart = $scope.Mart;
    }else
    {
      mart = 0;
    }

    Totalfee = parseInt(credit) + parseInt(mart);
    $scope.Total = Totalfee;
    
    $scope.Pinkoi = (credit * 0.1) + (mart * 0.1);
    if (credit > 0 && mart > 0)
    {
      $scope.FeeNoTax =((credit * 0.15)+10) + ((mart * 0.1)+15);
    }else if(credit == 0 && mart == 0)
    {
      $scope.FeeNoTax = 0
    }else if(credit == 0 && mart > 0)
    {
      $scope.FeeNoTax =((mart * 0.1)+15);
    }else if(credit > 0 && mart == 0)
    {
      $scope.FeeNoTax =((credit * 0.15)+10)
    }

    if ((typeof $scope.pBonus) != 'undefined' || $scope.pBonus != null) {
      $scope.FeeNoTax = $scope.FeeNoTax - $scope.pBonus;
    }
    
    $scope.Pinkoi = Math.round($scope.Pinkoi);
    $scope.FeeNoTax = Math.round($scope.FeeNoTax);
    $scope.FeeTax = Math.round($scope.FeeNoTax * 1.05);

    $scope.Remittance = $scope.Total - $scope.FeeTax;
    $scope.profitRate = (($scope.Remittance / $scope.Total)*100).toFixed(1) + '%'

  }

}

