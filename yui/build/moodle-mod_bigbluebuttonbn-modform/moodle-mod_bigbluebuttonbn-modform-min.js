YUI.add("moodle-mod_bigbluebuttonbn-modform",function(e,t){M.mod_bigbluebuttonbn=M.mod_bigbluebuttonbn||{},M.mod_bigbluebuttonbn.modform={bigbluebuttonbn:{},strings:{},init:function(e){this.bigbluebuttonbn=e,this.strings={as:M.util.get_string("mod_form_field_participant_list_text_as","bigbluebuttonbn"),viewer:M.util.get_string("mod_form_field_participant_bbb_role_viewer","bigbluebuttonbn"),moderator:M.util.get_string("mod_form_field_participant_bbb_role_moderator","bigbluebuttonbn"),remove:M.util.get_string("mod_form_field_participant_list_action_remove","bigbluebuttonbn")},this.updateInstanceTypeProfile(),this.participantListInit()},updateInstanceTypeProfile:function(){var t,n;t=e.one("#id_type"),n=this.bigbluebuttonbn.instanceTypeDefault,t!==null&&(n=t.get("value")),this.applyInstanceTypeProfile(n)},applyInstanceTypeProfile:function(e){var t=this.isFeatureEnabled(e,"all");this.showFieldset("id_room",t||this.isFeatureEnabled(e,"showroom")),this.showInput("id_record",t||this.isFeatureEnabled(e,"showroom")),this.showFieldset("id_recordings",t||this.isFeatureEnabled(e,"showrecordings")),this.showInput("id_recordings_imported",t||this.isFeatureEnabled(e,"showrecordings")),this.showFieldset("id_preuploadpresentation",t||this.isFeatureEnabled(e,"preuploadpresentation")),this.showFieldset("id_permissions",t||this.isFeatureEnabled(e,"permissions")),this.showFieldset("id_schedule",t||this.isFeatureEnabled(e,"schedule")),this.showFieldset("id_modstandardelshdr",t||this.isFeatureEnabled(e,"modstandardelshdr")),this.showFieldset("id_availabilityconditionsheader",t||this.isFeatureEnabled(e,"availabilityconditionsheader")),this.showFieldset("id_tagshdr",t||this.isFeatureEnabled(e,"tagshdr")),this.showFieldset("id_competenciessection",t||this.isFeatureEnabled(e,"competenciessection"))},isFeatureEnabled:function(e,t){var n=this.bigbluebuttonbn.instanceTypeProfiles[e].features;return n.indexOf(t)!=-1},showFieldset:function(t,n){var r=e.DOM.byId(t);if(!r)return;if(n){e.DOM.setStyle(r,"display","block");return}e.DOM.setStyle(r,"display","none")},showInput:function(t,n){var r=e.DOM.byId(t);if(!r)return;var i=e.one(r).ancestor("div").ancestor("div");if(n){i.setStyle("display","block");return}i.setStyle("display","none")},participantSelectionSet:function(){this.selectClear("bigbluebuttonbn_participant_selection");var e=document.getElementById("bigbluebuttonbn_participant_selection_type");for(var t=0;t<e.options.length;t++)if(e.options[t].selected){var n=this.bigbluebuttonbn.participantData[e.options[t].value].children;for(var r in n)n.hasOwnProperty(r)&&this.selectAddOption("bigbluebuttonbn_participant_selection",n[r].name,n[r].id);e.options[t].value==="all"?(this.selectAddOption("bigbluebuttonbn_participant_selection","---------------","all"),this.selectDisable("bigbluebuttonbn_participant_selection")):this.selectEnable("bigbluebuttonbn_participant_selection")}},participantListInit:function(){var e,t,n,r;this.participantListClear();for(var i=0;i<this.bigbluebuttonbn.participantList.length;i++){e=this.bigbluebuttonbn.participantList[i].selectiontype,t=this.bigbluebuttonbn.participantList[i].selectionid,n=this.bigbluebuttonbn.participantList[i].role,r=this.bigbluebuttonbn.participantData[e];if(e!="all"&&typeof r.children[t]=="undefined"){this.participantRemoveFromMemory(e,t);continue}this.participantAddToForm(e,t,n)}this.participantListUpdate()},participantListClear:function(){var e,t;e=document.getElementById("participant_list_table"),t=e.getElementsByTagName("tr");for(var n=t.length;n>0;n--)e.deleteRow(0)},participantListUpdate:function(){var e=document.getElementsByName("participants")[0];e.value=JSON.stringify(this.bigbluebuttonbn.participantList).replace(/"/g,"&quot;")},participantRemove:function(e,t){this.participantRemoveFromMemory(e,t),this.participantRemoveFromForm(e,t),this.participantListUpdate()},participantRemoveFromMemory:function(e,t){var n=t===""?null:t;for(var r=0;r<this.bigbluebuttonbn.participantList.length;r++)this.bigbluebuttonbn.participantList[r].selectiontype==e&&this.bigbluebuttonbn.participantList[r].selectionid==n&&this.bigbluebuttonbn.participantList.splice(r,1)},participantRemoveFromForm:function(e,t){var n="participant_list_tr_"+e+"-"+t,r=document.getElementById("participant_list_table");for(var i=0;i<r.rows.length;i++)r.rows[i].id==n&&r.deleteRow(i)},participantAdd:function(){var e=document.getElementById("bigbluebuttonbn_participant_selection_type"),t=document.getElementById("bigbluebuttonbn_participant_selection");for(var n=0;n<this.bigbluebuttonbn.participantList.length;n++)if(this.bigbluebuttonbn.participantList[n].selectiontype==e.value&&this.bigbluebuttonbn.participantList[n].selectionid==t.value)return;this.participantAddToMemory(e.value,t.value),this.participantAddToForm(e.value,t.value,"viewer"),this.participantListUpdate()},participantAddToMemory:function(e,t){this.bigbluebuttonbn.participantList.push({selectiontype:e,selectionid:t,role:"viewer"})},participantAddToForm:function(e,t,n){var r,i,s,o,u,a,f,l,c,h,p,d;r=document.getElementById("participant_list_table"),l=r.insertRow(r.rows.length),l.id="participant_list_tr_"+e+"-"+t,c=l.insertCell(0),c.width="125px",c.innerHTML="<b><i>"+this.bigbluebuttonbn.participantData[e].name,c.innerHTML+=(e!=="all"?":&nbsp;":"")+"</i></b>",h=l.insertCell(1),h.innerHTML="",e!=="all"&&(h.innerHTML=this.bigbluebuttonbn.participantData[e].children[t].name),i="&nbsp;<i>"+this.strings.as+"</i>&nbsp;",i+='<select id="participant_list_role_'+e+"-"+t+'"',i+=" onchange=\"M.mod_bigbluebuttonbn.modform.participantListRoleUpdate('",i+=e+"', '"+t,i+='\'); return 0;" class="select custom-select">',a=["viewer","moderator"];for(f=0;f<a.length;f++)s="",a[f]===n&&(s=' selected="selected"'),i+='<option value="'+a[f]+'"'+s+">"+this.strings[a[f]]+"</option>";i+="</select>",p=l.insertCell(2),p.innerHTML=i,d=l.insertCell(3),d.width="20px",o=this.strings.remove,u="btn btn-secondary btn-sm",this.bigbluebuttonbn.iconsEnabled&&(o=this.bigbluebuttonbn.pixIconDelete
,u="btn btn-link"),i='<a class="'+u+'" onclick="M.mod_bigbluebuttonbn.modform.participantRemove(\'',i+=e+"', '"+t,i+='\'); return 0;" title="'+this.strings.remove+'">'+o+"</a>",d.innerHTML=i},participantListRoleUpdate:function(e,t){var n=document.getElementById("participant_list_role_"+e+"-"+t);for(var r=0;r<this.bigbluebuttonbn.participantList.length;r++)this.bigbluebuttonbn.participantList[r].selectiontype==e&&this.bigbluebuttonbn.participantList[r].selectionid==(t===""?null:t)&&(this.bigbluebuttonbn.participantList[r].role=n.value);this.participantListUpdate()},selectClear:function(e){var t=document.getElementById(e);while(t.length>0)t.remove(t.length-1)},selectEnable:function(e){var t=document.getElementById(e);t.disabled=!1},selectDisable:function(e){var t=document.getElementById(e);t.disabled=!0},selectAddOption:function(e,t,n){var r=document.getElementById(e),i=document.createElement("option");i.text=t,i.value=n,r.add(i,i.length)}}},"@VERSION@",{requires:["base","node"]});