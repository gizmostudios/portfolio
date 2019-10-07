const buttons = {
  ui: document.getElementById('tab-btn-ui'),
  illustrations: document.getElementById('tab-btn-illustrations')
}

const tabs = {
  ui: document.getElementById('tab-ui'),
  illustrations: document.getElementById('tab-illustrations')
}

const subnav = document.getElementById('subnav');

let activeBtn, activeTab;

if(subnav) {
  window.addEventListener('hashchange', setSubPage);

  function setSubPage() {
    let subPage = window.location.hash.split('#/')[1] || 'ui';

    if(activeTab) activeTab.classList.add('hidden');
    activeTab = tabs[subPage];
    activeTab.classList.remove('hidden');

    if(activeBtn) activeBtn.classList.remove('selected');
    activeBtn = buttons[subPage];
    activeBtn.classList.add('selected');

  };

  window.addEventListener('scroll', () => {

    if(document.body.scrollTop >= subnav.offsetTop){
      subnav.classList.add('sticky');
    } else {
      subnav.classList.remove('sticky');
    }
  })

  setSubPage();
}
