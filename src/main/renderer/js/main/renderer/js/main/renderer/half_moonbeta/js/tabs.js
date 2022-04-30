"use strict";

var currently_active = "";
$('.default-tab').show();

function activeTab(name) {
  $('.default-tab').hide();
  $('#tab-' + currently_active).hide();
  currently_active = name;
  $('#tab-' + name).show();
}