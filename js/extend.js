var prev = document.body.querySelector('script#mention-extension');
if (prev != null) {
    document.body.removeChild(prev);
}

var body = document.querySelector('body');
script = document.createElement('script');
script.setAttribute('id', 'mention-extension');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', chrome.extension.getURL('js/mention.js'));
body.appendChild(script);