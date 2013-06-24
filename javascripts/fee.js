function FeeCtrl($scope) {
  $scope.Total = 0;
  $scope.change = function() {
    var fee,Totalfee = 0;
    Totalfee = parseInt($scope.Credit) + parseInt($scope.Mart);
    $scope.Total = Totalfee;
    
    $scope.Pinkoi = ($scope.Credit * 0.1) + ($scope.Mart * 0.1);
    $scope.FeeTax = ((($scope.Credit * 0.15)+10) + (($scope.Mart * 0.1)+15)) * 1.05;


    fee = $scope.Total - $scope.FeeTax; 
    if (fee >= 1000)
    {
      $scope.BankFee = 45;
      $scope.Remittance =  fee + 45;
      $scope.RemittanceError = '';
    }else if(fee <= 0)
    {
      $scope.BankFee = 0;
      $scope.Remittance = fee;
      $scope.RemittanceError = '你賣太少了啦，反而要倒貼...';
    }else
    {
      $scope.BankFee = 0;
      $scope.Remittance = fee;
      $scope.RemittanceError = '不足1000元累積至下個月份';
    }


  }

}

