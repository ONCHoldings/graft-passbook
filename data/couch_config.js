var config = require('./config');    
var cradle = require('cradle');
var cradle_db_conn = new cradle.Connection(config.db_host, config.db_port, {
  cache: false,
  raw: false
});

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
    }
  });
}
