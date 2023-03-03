var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');

module.exports = {
  titles: {
    experience: ['experience'],
    education: ['education'],
    positions: ['positions', 'position'],
    profiles: [
      'profiles',
      'social connect',
      'social-profiles',
      'social profiles',
    ]
  },
  profiles: [
      ['github.com', 
       function(url, Resume, profilesWatcher) {
      Resume.addObject('github',{url: url});
      profilesWatcher.inProgress--;
    }],
    ['linkedin.com', 
     function(url, Resume, profilesWatcher) {
      Resume.addObject('linkedin',{url: url});
      profilesWatcher.inProgress--;
    }],
     ['twitter.com',
        function(url, Resume, profilesWatcher) {
            Resume.addObject('twitter',{url: url});
            //profilesWatcher.inProgress--;
        }
    ],
    ['behance.net',
        function(url, Resume, profilesWatcher) {
            Resume.addObject('behance',{url: url});
            //profilesWatcher.inProgress--;
        }
    ],
    ['facebook.com',
        function(url, Resume, profilesWatcher) {
            Resume.addObject('facebook',{url: url});
            //profilesWatcher.inProgress--;
        }
    ],
    ['bitbucket.org',
        function(url, Resume, profilesWatcher) {
            Resume.addObject('bitbucket',{url: url});
            //profilesWatcher.inProgress--;
        }
    ],
    ['stackoverflow.com',
        function(url, Resume, profilesWatcher) {
            Resume.addObject('stackoverflow',{url: url})
            //profilesWatcher.inProgress--;
        }
    ]
  ],
  inline: {
    //address: 'address',
    skype: 'skype',
  },
  regular: {
    name: [/(?=^|$|[^\\p{L}])(^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[a-zàáâäãåąčćęèéêëėəįìíîïłńòóôöõøùúûüųūÿýżźñçčšžа-яё]{1,30}[ \n]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[a-zàáâäãåąčćęèéêëėəįìíîïłńòóôöõøùúûüųūÿýżźñçčšžа-яё]{1,30}$|^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1,30}[ \n]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1,30}$|^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[a-zàáâäãåąčćęèéêëėəįìíîïłńòóôöõøùúûüųūÿýżźñçčšžа-яё]{1,30}[ \n]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[a-zàáâäãåąčćęèéêëėəįìíîïłńòóôöõøùúûüųūÿýżźñçčšžа-яё]{1,30}[\s]|^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1,30}[ \n]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËƏİÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽА-ЯЁ]{1,30}[\s]){1}/],
    email: [/([a-zA-Z][a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/],
    phone: [/((?:\+?\d{1,3}[\s-])?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]\d{4,5})/,/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g],
  },
};

// helper method
function download(url, callback) {
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    } else {
      callback(null, error);
    }
  });
}
