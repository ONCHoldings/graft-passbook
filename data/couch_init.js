var config = require('./config.js');
var async = require('async');
var cradle = require('cradle');
var cradle_db_conn = new cradle.Connection(config.db_host, config.db_port, {
  cache: false,
  raw: false
});
var couch_pw_cards = null;

// =====  new approach (start)
// function get_couch_pw_cards() {
//   return couch_pw_cards;
// }
// 
// function createCollection() {
//   if (cradle_db_conn) {
//     cradle_db_conn.database("pw_cards").exists(function(err, exists) {
//       if (err) {
//         // couch_pw_cards = null;
//       } else if (exists) {
//         couch_pw_cards = cradle_db_conn.database("pw_cards");
//       } else {
//         cradle_db_conn.database("pw_cards").create();
//         couch_pw_cards = cradle_db_conn.database("pw_cards");
//       }
//       if (couch_pw_cards) {
//         couch_pw_cards.save("_design/pw_cards", {
//           all: {
//             map: function(doc) {
//               emit(null, doc);
//             }
//           },
//           by_deck_category_title_desc_tip: {
//             map: function(doc) {
//               if(doc.deck && doc.category && doc.title && doc.description && doc.tip) {
//                 emit([doc.deck, doc.category, doc.title, doc.description, doc.tip], doc);
//               }
//             }
//           }
//         });
//       }
//     });
//   }
// }
// 
// function putPredefinedData() {
//   var pre_data_stack = [
//     {
//       deck: 1, 
//       category: "Active",
//       title: "SEARCH",
//       description: "Search for a job that matches your interests, skills, needs, and lifestyle.",
//       tip: ""
//     },
//     {
//       deck: 1, 
//       category: "Active",
//       title: "APPLY",
//       description: "Personalize your cover letter, attach or leave your resume behind, and complete any additional application steps.",
//       tip: "Remember to spell check!"
//     },
//     {
//       deck: 1, 
//       category: "Active",
//       title: "INVESTIGATE",
//       description: "For a company of interest: who is the hiring manager? where is it located? do you know anyone on the 'inside'?",
//       tip: "You may have to call them!"
//     },
//     {
//       deck: 1, 
//       category: "Real",
//       title: "PLAN",
//       description: "Decide what you want to accomplish with your day. Outline the toughest and the easiest tasks. Decide which to accomplish first, your call!",
//       tip: "Do the most important first!!"
//     },
//     {
//       deck: 1, 
//       category: "Stable",
//       title: "BREAKFAST",
//       description: "Start your day right!",
//       tip: ""
//     },
//     {
//       deck: 1, 
//       category: "Stable",
//       title: "LUNCH",
//       description: "Remember to keep your fuel level high throughout the day!",
//       tip: ""
//     },
//     {
//       deck: 1, 
//       category: "Stable",
//       title: "DINNER",
//       description: "Reward yourself for a hard day of work!",
//       tip: ""
//     },
//     {
//       deck: 1, 
//       category: "Stable",
//       title: "BREAK",
//       description: "Take 10 - 30 minutes. Stretch your legs, take a walk, or do something you enjoy to keep your mind sharp when you return.",
//       tip: ""
//     },
//     {
//       deck: 2, 
//       category: "Active",
//       title: "SEARCH",
//       description: "Search for a job that matches your cohort buddy's interests, skills, needs, and lifestyle.",
//       tip: ""
//     },
//     {
//       deck: 2, 
//       category: "Active",
//       title: "APPLY",
//       description: "Personalize your cover letter, attach or leave your resume behind, and complete any additional application steps.",
//       tip: "Remember to spell check!"
//     },
//     {
//       deck: 2, 
//       category: "Active",
//       title: "SEARCH",
//       description: "Search for a job that matches your interests, skills, needs, and lifestyle.",
//       tip: ""
//     },
//     {
//       deck: 2, 
//       category: "Stable",
//       title: "CONNECT",
//       description: "Call your cohort buddy. Discuss goals for the day, what you did yesterday, if you applied to the job you sent each other, etc.",
//       tip: "Meet up for coffee to work!"
//     },
//     {
//       deck: 2, 
//       category: "Real",
//       title: "REFLECTION",
//       description: "Did you accomplish what you wanted? Did you expect too much or too little? What will you do differently tomorrow?",
//       tip: ""
//     }
//   ];
//   async.parallel([
//     function(callback) {
//       couch_pw_cards.view("pw_cards/all", function(err, dl_all) {
//         if(!err && dl_all.length > 0) {
//           async.forEach(dl_all, (function(da, cb) {
//             couch_pw_cards.remove(da._id, da._rev, function(err, rem_res) {
//               console.log('REMOVE RESULT: ', rem_res);
//               cb();
//             });
//           }), function(err) {
//             console.log("DB clean up process finished");
//             callback();
//           });
//         } else {
//           callback();
//         }
//       });
//     }
//   ], function(data) {
//     async.forEach(pre_data_stack, (function(pds, cb) {
//       couch_pw_cards.save(pds, function(err, s_res) {
//         console.log("PRELOAD ITEM SAVE RESULTS: ", JSON.stringify(err), s_res);
//         cb();
//       });
//     }), function(err) {
//       console.log("DB preload completed");
//     });
//   });
// }
// 
// module.exports = {
//   couch_pw_cards: get_couch_pw_cards,
//   createCollection: createCollection,
//   putPredefinedData: putPredefinedData
// };

// =====  new approach (end)



if (cradle_db_conn) {
  cradle_db_conn.database("pw_cards").exists(function(err, exists) {
    if (err) {
      couch_pw_cards = null;
    } else if (exists) {
      couch_pw_cards = cradle_db_conn.database("pw_cards");
    } else {
      cradle_db_conn.database("pw_cards").create();
      couch_pw_cards = cradle_db_conn.database("pw_cards");
    }
    if (couch_pw_cards) {
      couch_pw_cards.save("_design/pw_cards", {
        all: {
          map: function(doc) {
            emit(null, doc);
          }
        },
        by_deck_category_title_desc_tip: {
          map: function(doc) {
            if(doc.deck && doc.category && doc.title && doc.description && doc.tip) {
              emit([doc.deck, doc.category, doc.title, doc.description, doc.tip], doc);
            }
          }
        }
      });
      var pre_data_stack = [
        {
          deck: 1, 
          category: "Active",
          title: "SEARCH",
          description: "Search for a job that matches your interests, skills, needs, and lifestyle.",
          tip: ""
        },
        {
          deck: 1, 
          category: "Active",
          title: "APPLY",
          description: "Personalize your cover letter, attach or leave your resume behind, and complete any additional application steps.",
          tip: "Remember to spell check!"
        },
        {
          deck: 1, 
          category: "Active",
          title: "INVESTIGATE",
          description: "For a company of interest: who is the hiring manager? where is it located? do you know anyone on the 'inside'?",
          tip: "You may have to call them!"
        },
        {
          deck: 1, 
          category: "Real",
          title: "PLAN",
          description: "Decide what you want to accomplish with your day. Outline the toughest and the easiest tasks. Decide which to accomplish first, your call!",
          tip: "Do the most important first!!"
        },
        {
          deck: 1, 
          category: "Stable",
          title: "BREAKFAST",
          description: "Start your day right!",
          tip: ""
        },
        {
          deck: 1, 
          category: "Stable",
          title: "LUNCH",
          description: "Remember to keep your fuel level high throughout the day!",
          tip: ""
        },
        {
          deck: 1, 
          category: "Stable",
          title: "DINNER",
          description: "Reward yourself for a hard day of work!",
          tip: ""
        },
        {
          deck: 1, 
          category: "Stable",
          title: "BREAK",
          description: "Take 10 - 30 minutes. Stretch your legs, take a walk, or do something you enjoy to keep your mind sharp when you return.",
          tip: ""
        },
        {
          deck: 2, 
          category: "Active",
          title: "SEARCH",
          description: "Search for a job that matches your cohort buddy's interests, skills, needs, and lifestyle.",
          tip: ""
        },
        {
          deck: 2, 
          category: "Active",
          title: "APPLY",
          description: "Personalize your cover letter, attach or leave your resume behind, and complete any additional application steps.",
          tip: "Remember to spell check!"
        },
        {
          deck: 2, 
          category: "Active",
          title: "SEARCH",
          description: "Search for a job that matches your interests, skills, needs, and lifestyle.",
          tip: ""
        },
        {
          deck: 2, 
          category: "Stable",
          title: "CONNECT",
          description: "Call your cohort buddy. Discuss goals for the day, what you did yesterday, if you applied to the job you sent each other, etc.",
          tip: "Meet up for coffee to work!"
        },
        {
          deck: 2, 
          category: "Real",
          title: "REFLECTION",
          description: "Did you accomplish what you wanted? Did you expect too much or too little? What will you do differently tomorrow?",
          tip: ""
        }
      ];
      async.parallel([
        function(callback) {
          couch_pw_cards.view("pw_cards/all", function(err, dl_all) {
            if(!err && dl_all.length > 0) {
              async.forEach(dl_all, (function(da, cb) {
                couch_pw_cards.remove(da._id, da._rev, function(err, rem_res) {
                  console.log('REMOVE RESULT: ', rem_res);
                  cb();
                });
              }), function(err) {
                console.log("DB clean up process finished");
                callback();
              });
            } else {
              callback();
            }
          });
        }
      ], function(data) {
        async.forEach(pre_data_stack, (function(pds, cb) {
          couch_pw_cards.save(pds, function(err, s_res) {
            console.log("PRELOAD ITEM SAVE RESULTS: ", JSON.stringify(err), s_res);
            cb();
          });
        }), function(err) {
          console.log("DB preload completed");
        });
      });
    }
  });
}

// function test_dumm() {
//   var pre_data_stack = [
//     {
//       deck: 1, 
//       category: "Active",
//       title: "SEARCH",
//       description: "Search for a job that matches your interests, skills, needs, and lifestyle.",
//       tip: ""
//     },
//     {
//       deck: 1, 
//       category: "Active",
//       title: "APPLY",
//       description: "Personalize your cover letter, attach or leave your resume behind, and complete any additional application steps.",
//       tip: "Remember to spell check!"
//     },
//     {
//       deck: 1, 
//       category: "Active",
//       title: "INVESTIGATE",
//       description: "For a company of interest: who is the hiring manager? where is it located? do you know anyone on the 'inside'?",
//       tip: "You may have to call them!"
//     },
//     {
//       deck: 1, 
//       category: "Real",
//       title: "PLAN",
//       description: "Decide what you want to accomplish with your day. Outline the toughest and the easiest tasks. Decide which to accomplish first, your call!",
//       tip: "Do the most important first!!"
//     },
//     {
//       deck: 1, 
//       category: "Stable",
//       title: "BREAKFAST",
//       description: "Start your day right!",
//       tip: ""
//     },
//     {
//       deck: 1, 
//       category: "Stable",
//       title: "LUNCH",
//       description: "Remember to keep your fuel level high throughout the day!",
//       tip: ""
//     },
//     {
//       deck: 1, 
//       category: "Stable",
//       title: "DINNER",
//       description: "Reward yourself for a hard day of work!",
//       tip: ""
//     },
//     {
//       deck: 1, 
//       category: "Stable",
//       title: "BREAK",
//       description: "Take 10 - 30 minutes. Stretch your legs, take a walk, or do something you enjoy to keep your mind sharp when you return.",
//       tip: ""
//     },
//     {
//       deck: 2, 
//       category: "Active",
//       title: "SEARCH",
//       description: "Search for a job that matches your cohort buddy's interests, skills, needs, and lifestyle.",
//       tip: ""
//     },
//     {
//       deck: 2, 
//       category: "Active",
//       title: "APPLY",
//       description: "Personalize your cover letter, attach or leave your resume behind, and complete any additional application steps.",
//       tip: "Remember to spell check!"
//     },
//     {
//       deck: 2, 
//       category: "Active",
//       title: "SEARCH",
//       description: "Search for a job that matches your interests, skills, needs, and lifestyle.",
//       tip: ""
//     },
//     {
//       deck: 2, 
//       category: "Stable",
//       title: "CONNECT",
//       description: "Call your cohort buddy. Discuss goals for the day, what you did yesterday, if you applied to the job you sent each other, etc.",
//       tip: "Meet up for coffee to work!"
//     },
//     {
//       deck: 2, 
//       category: "Real",
//       title: "REFLECTION",
//       description: "Did you accomplish what you wanted? Did you expect too much or too little? What will you do differently tomorrow?",
//       tip: ""
//     }
//   ];
//   if(couch_pw_cards) {
//     console.log("couch_pw_cards : ", couch_pw_cards);
//     couch_pw_cards.view("pw_cards/all", function(err, dl_all) {
//       console.log("INSIDE VIEW !!!!!");
//       console.log(dl_all);
//     });
//   }
//   async.parallel([
//     function(callback) {
//       callback();
//     }
//   ], function(data) {
//     async.forEach(pre_data_stack, (function(pds, cb) {
//       // console.log("pre_data_stack item: ", pds);
//       cb();
//     }), function(err) {
//       console.log("DB preload completed");
//     });
//   });
// }
// 
// module.exports = {
//   test_dumm: test_dumm
// };
