var Posts = new Meteor.Collection('posts');

if (Meteor.isClient) {
  Template.hello.post = function() {
    return Posts.findOne();
  }
  
  Template.hello.users = function() {
    return [{_id: 'c', userName: 'tom'}, {_id: 'b', userName: '2'}];
  }
  
  Template.hello.isSelected = function() {
    var post = Posts.findOne();
    return post && this._id === post.userId;
  }
  
  Meteor.startup(function() {
    Meteor.setInterval(function() {
      Posts.update({}, {$inc: {score: 1}});
    }, 1000);
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Posts.find().count() === 0) {
      console.log('inserting');
      Posts.insert({score: 0});
    }
  });
}
