describe('UserController tests', function () {

  var $scope1;
  beforeEach(module('main'));
  beforeEach(inject(function ($rootScope) {
    $rootscope = $rootScope.$new(); //factory 
  }));

  it('check for genders loading', 
    inject(function ($controller) {
    var ctrl = $controller('UserController', {
      $scope: $scope1,  
      project: {
        teamMembers: [teamMember]
      }
    });
    // $scope.project ={
    //   teamMembers:[teamMember]
    // }
    //verify the initial setup
    expect($rootscope.project.teamMembers).toEqual([teamMember]);

    //execute and verify results
    $scope1.removeTeamMember(teamMember);
    expect($scope1.project.teamMembers).toEqual([]);
  }));

  it('should remove an existing team member by the name Ram', 
    inject(function ($controller) {

    var teamMembers = [{
      name:'Ram'
    },{
      name:'John'
    }];
    var ctrl = $controller('ProjectsEditCtrl', {
      $scope: $scope1,
      project: {
        teamMembers: teamMembers
        }
    });
    //verify the initial setup
    // expect($scope.project.teamMembers).toEqual([teamMember]);

    //execute and verify results
    $scope1.removeTeamMember($scope1.project.teamMembers[0]);
    expect($scope1.project.teamMembers.length).toEqual(1);
    angular.forEach($scope1.project.teamMembers, function(ele){
    expect(ele.name).toNotEqual('Ram');
    })
    
  }));
});