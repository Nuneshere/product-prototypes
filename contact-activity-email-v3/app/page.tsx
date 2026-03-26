/* eslint-disable */
// @ts-nocheck
'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
  // ── Tab switching ──
    function switchTab(name) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.subnavigation-item').forEach(b => b.classList.remove('active'));
      document.getElementById('tab-' + name).classList.add('active');
      document.getElementById('tab-btn-' + name).classList.add('active');
      closeAllDropdowns();
    }
  
    // ── Activity "+" dropdown ──
    function toggleAddMenu() {
      const menu = document.getElementById('add-activity-menu');
      menu.classList.toggle('open');
    }
  
    // ── Activity tab note composer ──
    function showActivityNoteComposer() {
      closeAllDropdowns();
      var wrap = document.getElementById('activity-note-composer-wrap');
      wrap.innerHTML = getNoteComposerHTML('activity-add');
      wrap.style.display = 'block';
      wrap.querySelector('.note-composer-body').focus();
    }
  
    // ── Access level toggle ──
    var hasAccess = true;
    function toggleAccessLevel() {
      hasAccess = !hasAccess;
      document.getElementById('access-label').textContent = hasAccess ? 'Access' : 'No access';
      document.getElementById('access-description').textContent = hasAccess
        ? 'Bodies and attachments of your emails with this record are visible to all workspace members.'
        : 'Email bodies and attachments are private. Only users with explicit access can view them.';
    }
  
    // ── Email three-dot menu ──
    var emailDotsMenuOpen = false;
    var emailAccessPopoverOpen = false;
  
    function toggleEmailDotsMenu(e) {
      e.stopPropagation();
      // Close access popover if open
      if (emailAccessPopoverOpen) {
        emailAccessPopoverOpen = false;
        document.getElementById('email-access-popover').style.display = 'none';
      }
      emailDotsMenuOpen = !emailDotsMenuOpen;
      document.getElementById('email-dots-menu').style.display = emailDotsMenuOpen ? 'block' : 'none';
    }
  
    // ── Email three-dot actions ──
    function openManageAccess() {
      // Close the dropdown, open the access popover
      document.getElementById('email-dots-menu').style.display = 'none';
      emailDotsMenuOpen = false;
      emailAccessPopoverOpen = true;
      document.getElementById('email-access-popover').style.display = 'block';
    }
  
    function openEmailSyncSettings() {
      // Just close dropdown — prototype only, no action
      document.getElementById('email-dots-menu').style.display = 'none';
      emailDotsMenuOpen = false;
    }
  
    // ── Compose email (New Email button) ──
    function openComposePanel() {
      var panel = document.getElementById('email-detail-panel');
      panel.classList.add('compose-mode');
      panel.classList.add('open');
      document.querySelector('.edp-top-bar-label').textContent = 'Compose Email';
      // Reset fields
      document.getElementById('edp-compose-to').value = '';
      document.getElementById('edp-compose-subject').value = '';
      document.getElementById('edp-compose-body').innerHTML = '';
      setTimeout(function() { document.getElementById('edp-compose-to').focus(); }, 50);
      emailPanelJustOpened = true;
    }
  
    // ── Share popover (inside email detail panel) ──
    var edpSharePopoverOpen = false;
    function toggleSharePopover(e) {
      e.stopPropagation();
      edpSharePopoverOpen = !edpSharePopoverOpen;
      document.getElementById('edp-share-popover').style.display = edpSharePopoverOpen ? 'block' : 'none';
      if (edpSharePopoverOpen) {
        // Set title to current email subject
        var d = emailData[currentEmailIdx];
        document.getElementById('edp-share-title').textContent = '"' + d.subject + '"';
      }
    }
    var shareAccessHasAccess = true;
    function toggleShareAccessLevel() {
      shareAccessHasAccess = !shareAccessHasAccess;
      document.getElementById('edp-share-access-label').textContent = shareAccessHasAccess ? 'Access' : 'No Access';
      document.getElementById('edp-share-description').textContent = shareAccessHasAccess
        ? 'Bodies and attachments of this email are visible to all workspace members.'
        : 'This email body and attachments are private. Only users with explicit access can view them.';
    }
  
    // ── Email data for detail panel ──
    var emailData = [
      {
        subject: 'RE: Brand refresh timeline',
        threads: [
          {
            senderName: 'Michael Fawler',
            senderAvatar: 'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png',
            to: 'tom.bradley@catalystconsulting.io',
            date: 'Jan 19, 10:22 AM',
            snip: 'Tom, just wanted to check in on the mood board timeline before we sync Thursday...',
            body: '<p>Tom,</p><p>Just wanted to check in on the mood board timeline before we sync Thursday. Are we still planning to present all three directions or have you narrowed it down? Also — should we include the secondary colour palette in this first round or keep it to the primary system?</p><p>Michael</p>'
          },
          {
            senderName: 'Tom Bradley',
            senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            to: 'Michael Fawler, jessica.moore@techstart.co',
            date: 'Jan 21, 2:07 PM',
            snip: 'Michael, all three directions are ready. I\'d lean towards presenting all for now...',
            body: '<p>Michael,</p><p>All three directions are ready. I\'d lean towards presenting all for now — better to have options on the table than to pre-filter and miss something the client connects with.</p><p>Looping in Jess on the studio question — she\'s coordinating with the photography team this week.</p><p>Tom</p>'
          },
          {
            senderName: 'Tom Bradley',
            senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            to: 'Michael Fawler, jessica.moore@techstart.co',
            date: 'Jan 22, 3:15 PM',
            snip: 'I\'ve pushed the mood board review to Thursday to keep us on track...',
            body: '<p>Hi both,</p><p>I\'ve pushed the mood board review to Thursday to keep us on track for the Feb 14 deliverable. One question: do you want to include the secondary colour palette in the first round, or should we keep it focused on the primary system for now?</p><p>Also flagging that the photography team needs a final answer on the location by end of week — Jess, can you confirm if we\'re using the Canary Wharf studio or moving to the East London space?</p><p>Thanks,<br>Tom</p>'
          }
        ],
        comments: [
          { author: 'Tom Bradley', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Should we loop in the photography team on this thread or create a separate one for the studio booking?', time: 'Jan 22, 3:30 PM' },
          { author: 'You', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Good call — let\'s keep them separate. I\'ll create a dedicated thread for the studio booking so it doesn\'t get buried here.', time: 'Jan 22, 4:01 PM' }
        ]
      },
      {
        subject: 'Q1 Retainer hours update',
        threads: [
          {
            senderName: 'Michael Fawler',
            senderAvatar: 'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png',
            to: 'amanda.chen@catalystconsulting.io',
            date: 'Jan 18, 11:15 AM',
            snip: 'Amanda, I wanted to flag that the market positioning analysis is running long...',
            body: '<p>Amanda,</p><p>I wanted to flag that the market positioning analysis is running longer than we originally scoped. Is it possible to get a revised estimate before we continue, or would it be easier to just run slightly over and reconcile at the end of the month?</p><p>Happy to jump on a quick call if that\'s easier.</p><p>Michael</p>'
          },
          {
            senderName: 'Amanda Chen',
            senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            to: 'Michael Fawler, billing@techstart.co',
            date: 'Jan 20, 9:31 AM',
            snip: 'Quick heads up — we\'re at 34 of 40 hours for the month...',
            body: '<p>Michael,</p><p>Quick heads up — we\'re at 34 of 40 hours for the month. The market positioning analysis took longer than scoped. Want us to pause and check in, or are you happy for us to go slightly over to complete the deliverable?</p><p>If you\'d prefer we hold, I can scope a small add-on and send it over for sign-off before we continue. Let me know how you\'d like to handle it.</p><p>Best,<br>Amanda</p>'
          }
        ],
        comments: []
      },
      {
        subject: 'RE: RE: Sales deck feedback',
        threads: [
          {
            senderName: 'Tom Bradley',
            senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            to: 'michael.fawler@techstart.co',
            date: 'Jan 14, 9:42 AM',
            snip: 'Michael, sharing the first cut of the updated sales deck. Let me know your thoughts...',
            body: '<p>Michael,</p><p>Sharing the first cut of the updated sales deck. Let me know your thoughts on the narrative — I\'ve restructured the problem framing on slides 3–5 and added a new case study on slide 11. Happy to iterate further based on your feedback.</p><p>Tom</p>'
          },
          {
            senderName: 'Michael Fawler',
            senderAvatar: 'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png',
            to: 'Tom Bradley',
            date: 'Jan 16, 3:55 PM',
            snip: 'Tom, strong start — the restructured narrative lands much better. A few notes...',
            body: '<p>Tom,</p><p>Strong start — the restructured narrative lands much better. A few notes: I\'d tighten the opening hook on slide 2, and slide 9 feels a bit disconnected from the rest of the story. Otherwise looking good. I\'ve looped in Priya for a second set of eyes.</p><p>Michael</p>'
          },
          {
            senderName: 'Tom Bradley',
            senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            to: 'Michael Fawler, priya.sharma@techstart.co',
            date: 'Jan 17, 11:28 AM',
            snip: 'Updated deck attached — I\'ve tightened slide 2 and removed slide 9...',
            body: '<p>Michael, Priya,</p><p>Updated deck attached — I\'ve tightened slide 2 and removed slide 9 (it was trying to do too much). Priya, happy to walk you through the full flow if it helps before you give feedback.</p><p>Tom</p>'
          },
          {
            senderName: 'Michael Fawler',
            senderAvatar: 'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png',
            to: 'Tom Bradley, priya.sharma@techstart.co',
            date: 'Jan 18, 12:03 PM',
            snip: 'The updated deck looks great. Priya had one note — can we swap the customer logos on slide 8?',
            body: '<p>Tom,</p><p>The updated deck looks great. Priya had one note — can we swap the customer logos on slide 8? Two of them churned last quarter and it\'ll be awkward if prospects recognise them. Otherwise the narrative flow is exactly right and the case study on slide 11 lands really well.</p><p>Happy to jump on a quick call tomorrow if it\'s easier to run through the remaining tweaks together.</p><p>Michael</p>'
          }
        ],
        comments: [
          { author: 'Priya Sharma', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', text: 'Those two logos are Acme Corp and Dynamo — both churned in October. Michael is right to flag this before it goes to a prospect.', time: 'Jan 18, 12:45 PM' }
        ]
      },
      {
        subject: 'Workshop prep – stakeholder list',
        threads: [
          {
            senderName: 'Michael Fawler',
            senderAvatar: 'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png',
            to: 'amanda.chen@catalystconsulting.io',
            date: 'Jan 14, 2:30 PM',
            snip: 'Amanda, quick question on the workshop — do you need the full exec list or just the...',
            body: '<p>Amanda,</p><p>Quick question on the workshop — do you need the full exec list now, or just the confirmed attendees? I\'m still chasing two people and don\'t want to delay your prep if you can work with what we have confirmed so far.</p><p>Michael</p>'
          },
          {
            senderName: 'Amanda Chen',
            senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            to: 'Michael Fawler, Tom Bradley',
            date: 'Jan 15, 4:11 PM',
            snip: 'Attached is the pre-read for next week\'s positioning workshop...',
            body: '<p>Michael, Tom,</p><p>Attached is the pre-read for next week\'s positioning workshop. Michael, can you confirm who from the exec team will attend? We\'re designing breakout exercises and need to know if we\'re working with five people or eight.</p><p>Tom — the agenda draft is on slide 3. Let me know if you want to add the competitive landscape section back in; I removed it to keep the day tighter but happy to reinstate it if it\'s useful context for the group.</p><p>See you both next Tuesday.</p><p>Amanda</p>'
          }
        ],
        comments: []
      },
      {
        subject: 'RE: Case study draft – Northvolt',
        threads: [
          {
            senderName: 'Amanda Chen',
            senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            to: 'michael.fawler@techstart.co, marketing@techstart.co',
            date: 'Jan 10, 2:18 PM',
            snip: 'Michael, sharing the Northvolt case study draft for your review...',
            body: '<p>Michael,</p><p>Sharing the Northvolt case study draft for your review. We\'ve led with the pipeline ROI numbers as they\'re the most compelling proof point. Please let me know if there are any approvals still outstanding on our end before we finalise.</p><p>Amanda</p>'
          },
          {
            senderName: 'Michael Fawler',
            senderAvatar: 'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png',
            to: 'amanda.chen@catalystconsulting.io, marketing@techstart.co',
            date: 'Jan 12, 8:55 AM',
            snip: 'Legal flagged one issue — we can\'t disclose the actual revenue numbers in section 3...',
            body: '<p>Amanda,</p><p>Legal flagged one issue — we can\'t disclose the actual revenue numbers in section 3. Can you rework it to use percentages instead? "340% ROI in pipeline" rather than the absolute figures. The rest of the draft reads well and the intro is particularly strong.</p><p>One other thing: marketing would like to add a pull quote from the Northvolt CPO. I\'ll chase them for the approval and forward it over as soon as I have it.</p><p>Thanks,<br>Michael</p>'
          }
        ],
        comments: []
      }
    ];
  
    // ── Email detail panel ──
    var currentEmailIdx = 0;
    var emailPanelJustOpened = false;
  
    var SVG_REPLY = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.27354 1.56964C5.89493 0.9124 7.00019 1.35217 7.00019 2.25665V4.06953C10.7192 4.59256 13.3352 8.00126 13.0304 12.3668C12.9847 13.0205 12.1535 13.0928 11.8977 12.5968C10.692 10.2587 8.89945 9.29527 7.00019 9.05998V10.7434C7.00019 11.6479 5.89493 12.0876 5.27354 11.4304L1.26163 7.18703C0.897164 6.80153 0.897163 6.1985 1.26163 5.813L5.27354 1.56964ZM6.00019 2.25665L1.98828 6.50002L6.00019 10.7434V8.51373C6.00019 8.37631 6.05675 8.24494 6.15659 8.1505C6.25643 8.05606 6.39074 8.00687 6.52795 8.0145C8.54734 8.12681 10.5433 8.91207 12.0195 10.9001C11.7101 7.55569 9.4003 5.23561 6.4631 5.01712C6.20207 4.9977 6.00019 4.78025 6.00019 4.5185V2.25665Z" fill="currentColor"/></svg>';
    var SVG_REPLY_ALL = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.80541 1.8163C7.41084 1.21935 8.49974 1.62993 8.49974 2.53798V4.1708C10.069 4.54132 11.2669 5.50343 12.0398 6.86708C12.8204 8.24462 13.1598 10.0126 13.0583 11.9765L13.032 12.372C12.9836 12.9695 12.2519 13.0912 11.9499 12.6776L11.8962 12.5878C11.2926 11.366 10.7034 10.5437 10.073 9.99892C9.59921 9.58955 9.08794 9.32488 8.49974 9.17177V10.4628L8.4851 10.6376C8.3557 11.4205 7.37044 11.7411 6.80541 11.1835L6.69115 11.0507L3.80931 7.08876C3.55434 6.73819 3.55452 6.26261 3.80931 5.91201L6.69115 1.95009L6.80541 1.8163ZM3.59642 2.08095C3.75892 1.85803 4.07149 1.80834 4.29467 1.9706C4.5177 2.13292 4.56695 2.4456 4.40502 2.66884L1.61888 6.4999L4.40502 10.331L4.4558 10.4179C4.55233 10.6295 4.48984 10.8869 4.29467 11.0292C4.0992 11.1713 3.8355 11.151 3.66381 10.994L3.59642 10.9188L0.81029 7.08779C0.555452 6.73719 0.555396 6.26258 0.81029 5.91201L3.59642 2.08095ZM4.61791 6.4999V6.50087L7.49974 10.4628V8.56533C7.49974 8.42102 7.56198 8.28332 7.67064 8.18837C7.77937 8.09348 7.92413 8.04979 8.06713 8.06923C9.07542 8.20681 9.94483 8.5669 10.7263 9.24208C11.2091 9.65926 11.6483 10.189 12.0652 10.8417C12.008 9.47642 11.6981 8.29269 11.1697 7.36025C10.4695 6.12493 9.37934 5.3103 7.91967 5.07314C7.67781 5.0338 7.4999 4.82499 7.49974 4.57998V2.53798L4.61791 6.4999Z" fill="currentColor"/></svg>';
    var SVG_FORWARD = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.4061 1.91318L8.76943 1.56967L12.7813 5.81304C13.1458 6.19853 13.1458 6.80156 12.7813 7.18706L8.76943 11.4304C8.14804 12.0877 7.04278 11.6479 7.04278 10.7434V8.51376C5.4791 8.62766 3.4622 9.41292 2.14522 12.5969C1.88945 13.0928 1.05823 13.0205 1.01257 12.3668C0.695235 7.8223 3.54318 4.31467 7.57987 5.01715V2.25668C7.04278 1.3522 8.14804 0.912432 8.4061 1.91318ZM8.04278 2.25668V4.51853C8.04278 4.78028 7.8409 4.99773 7.57987 5.01715C4.24911 5.26492 1.72511 8.2152 2.01014 12.2971C3.4622 10.0432 5.4791 9.1293 7.51502 8.01454C7.78654 8.05609 7.98622 8.24497 8.04278 8.51376V10.7434L12.0547 6.50005L8.04278 2.25668Z" fill="currentColor"/></svg>';
  
    function renderEmailThread(idx) {
      var d = emailData[idx];
      var threads = d.threads;
      var html = '';
      for (var i = 0; i < threads.length; i++) {
        var msg = threads[i];
        var isLast = (i === threads.length - 1);
        var collapsed = !isLast;
        html += '<div class="edp-thread-msg' + (collapsed ? ' collapsed' : '') + '" onclick="toggleThreadMsg(this)">';
        html += '<div class="edp-thread-msg-header">';
        html += '<div class="user-avatar avatar-xs" style="background-image:url(\'' + msg.senderAvatar + '\');flex-shrink:0;"></div>';
        html += '<div class="edp-thread-msg-meta">';
        html += '<div class="edp-thread-msg-sender">' + msg.senderName + '</div>';
        if (collapsed) {
          html += '<div class="edp-thread-msg-snip">' + msg.snip + '</div>';
        } else {
          html += '<div class="edp-thread-msg-to">to ' + msg.to + '</div>';
        }
        html += '</div>';
        html += '<span class="edp-thread-msg-date">' + msg.date + '</span>';
        html += '<div class="edp-thread-msg-actions">';
        if (!collapsed) {
          html += '<button class="edp-action-btn" data-tooltip="Reply" onclick="event.stopPropagation();openReply()">' + SVG_REPLY + '</button>';
          html += '<button class="edp-action-btn" data-tooltip="Reply all" onclick="event.stopPropagation();openReply()">' + SVG_REPLY_ALL + '</button>';
          html += '<button class="edp-action-btn" data-tooltip="Forward" onclick="event.stopPropagation();">' + SVG_FORWARD + '</button>';
        }
        html += '</div>';
        html += '</div>'; // end header
        html += '<div class="edp-thread-msg-body">' + msg.body + '</div>';
        html += '</div>'; // end thread-msg
      }
      document.getElementById('edp-body').innerHTML = html;
    }
  
    function toggleThreadMsg(el) {
      el.classList.toggle('collapsed');
    }
  
    function renderEmailComments(idx) {
      var d = emailData[idx];
      var comments = d.comments || [];
      var displayEl = document.getElementById('edp-comments-display');
      if (!displayEl) return;
      var html = '';
      for (var i = 0; i < comments.length; i++) {
        var c = comments[i];
        html += '<div class="edp-comment-item">';
        html += '<div class="user-avatar avatar-xs" style="background-image:url(\'' + c.avatar + '\');flex-shrink:0;margin-top:2px;"></div>';
        html += '<div class="edp-comment-bubble">';
        html += '<div class="edp-comment-author">' + c.author + '</div>';
        html += '<div class="edp-comment-text">' + c.text + '</div>';
        html += '<div class="edp-comment-time">' + c.time + '</div>';
        html += '</div></div>';
      }
      displayEl.innerHTML = html;
    }
  
    function submitNoteFromTab() {
      var compose = document.getElementById('edp-note-compose');
      var text = compose ? compose.innerText.trim() : '';
      if (!text) return;
      var d = emailData[currentEmailIdx];
      d.comments.push({
        author: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: text,
        time: 'Just now'
      });
      compose.innerHTML = '';
      renderEmailComments(currentEmailIdx);
      // Scroll thread area to show the new comment
      var viewMode = document.querySelector('.edp-view-mode');
      if (viewMode) viewMode.scrollTop = viewMode.scrollHeight;
    }
  
    function switchComposeTab(tab) {
      var replyTab = document.getElementById('edp-tc-tab-reply');
      var noteTab = document.getElementById('edp-tc-tab-note');
      var replyPanel = document.getElementById('edp-tc-panel-reply');
      var notePanel = document.getElementById('edp-tc-panel-note');
      var tabCompose = document.getElementById('edp-tabbed-compose');
      if (tab === 'reply') {
        replyTab.classList.add('edp-tc-tab--active');
        noteTab.classList.remove('edp-tc-tab--active');
        replyPanel.classList.add('edp-tc-panel--active');
        notePanel.classList.remove('edp-tc-panel--active');
        tabCompose.style.background = '';
        document.getElementById('edp-reply-compose').focus();
      } else {
        noteTab.classList.add('edp-tc-tab--active');
        replyTab.classList.remove('edp-tc-tab--active');
        notePanel.classList.add('edp-tc-panel--active');
        replyPanel.classList.remove('edp-tc-panel--active');
        tabCompose.style.background = '#fffcf0';
        document.getElementById('edp-note-compose').focus();
      }
    }
  
    var aiTimer = null;
    function generateWithAI() {
      // Switch to Reply tab
      switchComposeTab('reply');
      // Show AI overlay
      var overlay = document.getElementById('edp-ai-overlay');
      overlay.classList.add('visible');
      // Simulate AI generation (1.8s delay)
      aiTimer = setTimeout(function() {
        overlay.classList.remove('visible');
        var d = emailData[currentEmailIdx];
        var lastMsg = d.threads[d.threads.length - 1];
        var suggestions = [
          'Hi ' + lastMsg.senderName.split(' ')[0] + ',\n\nThanks for the update — this all sounds good. Happy to proceed with the approach you\'ve outlined.\n\nOne quick note: could you send over the latest version once you\'ve made those changes? I\'d like to review before it goes out.\n\nThanks,\nMichael',
          'Hi ' + lastMsg.senderName.split(' ')[0] + ',\n\nGreat, thanks for looping me in. I\'ll take a look and come back to you by end of day tomorrow.\n\nBest,\nMichael',
          lastMsg.senderName.split(' ')[0] + ' — thanks for this. A few thoughts:\n\n1. The approach looks solid overall.\n2. I\'d suggest we schedule a short sync to align on next steps before moving forward.\n3. Happy to make the final call once we\'ve spoken.\n\nDoes Thursday work for a 20-min call?\n\nMichael'
        ];
        var compose = document.getElementById('edp-reply-compose');
        if (compose) {
          compose.innerText = suggestions[Math.floor(Math.random() * suggestions.length)];
          compose.focus();
        }
      }, 1800);
    }
  
    function cancelAI() {
      if (aiTimer) { clearTimeout(aiTimer); aiTimer = null; }
      document.getElementById('edp-ai-overlay').classList.remove('visible');
    }
  
    function openEmailPanel(idx) {
      var d = emailData[idx];
      currentEmailIdx = idx;
      // Ensure we're in view mode
      var panel = document.getElementById('email-detail-panel');
      panel.classList.remove('compose-mode');
      document.querySelector('.edp-top-bar-label').textContent = 'View email';
      // Populate subject
      document.getElementById('edp-subject').textContent = d.subject;
      // Render thread messages and comments
      renderEmailThread(idx);
      renderEmailComments(idx);
      // Reset to Reply tab, clear compose areas
      switchComposeTab('reply');
      clearReply();
      cancelAI();
      edpSharePopoverOpen = false;
      document.getElementById('edp-share-popover').style.display = 'none';
      panel.classList.add('open');
      emailPanelJustOpened = true;
    }
  
    function closeEmailPanel() {
      var panel = document.getElementById('email-detail-panel');
      panel.classList.remove('open');
      panel.classList.remove('compose-mode');
      document.querySelector('.edp-top-bar-label').textContent = 'View email';
      clearReply();
      edpSharePopoverOpen = false;
      document.getElementById('edp-share-popover').style.display = 'none';
    }
  
    // ── Reply compose ── (now just focuses the always-visible Reply tab)
    function openReply() {
      switchComposeTab('reply');
      document.getElementById('edp-reply-compose').focus();
    }
  
    function closeReply() {
      clearReply();
    }
  
    function clearReply() {
      var el = document.getElementById('edp-reply-compose');
      if (el) el.innerHTML = '';
    }
  
    // Discard button: clear reply if in view mode, close panel if in compose mode
    function discardDraft() {
      var panel = document.getElementById('email-detail-panel');
      if (panel.classList.contains('compose-mode')) {
        closeEmailPanel();
      } else {
        clearReply();
      }
    }
  
    // ── Close everything when clicking outside ──
    function closeAllDropdowns() {
      document.getElementById('add-activity-menu').classList.remove('open');
    }
  
    // ── Companies section expand/collapse ──
    document.querySelector('.sidebar-section-title').addEventListener('click', function() {
      this.closest('.sidebar-section').classList.toggle('sidebar-section--open');
    });
  
    // ── Properties section expand/collapse ──
    document.querySelector('.page-properties-section-title-toggle').addEventListener('click', function() {
      var title = this.closest('.page-properties-section-title');
      var icon = this.querySelector('.page-properties-section-title-toggle-icon');
      title.classList.toggle('page-properties-section-title--open');
      icon.classList.toggle('page-properties-section-title-toggle-icon--open');
    });
  
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.add-btn-wrap')) {
        document.getElementById('add-activity-menu').classList.remove('open');
      }
      if (!e.target.closest('.email-dots-wrap')) {
        if (emailDotsMenuOpen) {
          emailDotsMenuOpen = false;
          document.getElementById('email-dots-menu').style.display = 'none';
        }
        if (emailAccessPopoverOpen) {
          emailAccessPopoverOpen = false;
          document.getElementById('email-access-popover').style.display = 'none';
        }
      }
      // Close share popover when clicking outside subject bar
      if (edpSharePopoverOpen && !e.target.closest('.edp-subject-bar')) {
        edpSharePopoverOpen = false;
        document.getElementById('edp-share-popover').style.display = 'none';
      }
      // Close email detail panel when clicking outside it
      // Skip if this is the same click that just opened the panel
      if (emailPanelJustOpened) {
        emailPanelJustOpened = false;
      } else {
        var panel = document.getElementById('email-detail-panel');
        if (panel && panel.classList.contains('open') && !e.target.closest('#email-detail-panel')) {
          closeEmailPanel();
        }
      }
    });
  
    // ── Email connection flow ──
    var currentEmailProvider = 'gmail';
  
    var gmailIconSm = '<svg width="28" height="21" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4v26a4 4 0 004 4h8V15.5L0 4z" fill="#EA4335"/><path d="M46 4v26a4 4 0 01-4 4h-8V15.5L46 4z" fill="#4285F4"/><path d="M12 34V15.5L23 24l11-8.5V34H12z" fill="#FBBC05"/><path d="M0 4C0 1.8 1.8 0 4 0h38c2.2 0 4 1.8 4 4L23 18.5 0 4z" fill="#34A853"/></svg>';
  
    var outlookIconSm = '<svg width="28" height="28" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="24" height="32" rx="3" fill="#0078D4"/><rect x="12" y="1" width="30" height="38" rx="3" fill="#0078D4"/><rect x="15" y="4" width="24" height="32" rx="2" fill="#50A0E8"/><path d="M15 10h24v4l-12 8-12-8v-4z" fill="white" opacity="0.9"/><path d="M15 14l12 8 12-8v18H15V14z" fill="white" opacity="0.15"/><ellipse cx="10" cy="22" rx="6" ry="7" fill="white"/><ellipse cx="10" cy="22" rx="3.5" ry="4.5" fill="#0078D4"/></svg>';
  
    var gmailLogoLg = '<svg width="46" height="34" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4v26a4 4 0 004 4h8V15.5L0 4z" fill="#EA4335"/><path d="M46 4v26a4 4 0 01-4 4h-8V15.5L46 4z" fill="#4285F4"/><path d="M12 34V15.5L23 24l11-8.5V34H12z" fill="#FBBC05"/><path d="M0 4C0 1.8 1.8 0 4 0h38c2.2 0 4 1.8 4 4L23 18.5 0 4z" fill="#34A853"/></svg>';
  
    var outlookLogoLg = '<svg width="46" height="46" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="24" height="32" rx="3" fill="#0078D4"/><rect x="12" y="1" width="30" height="38" rx="3" fill="#0078D4"/><rect x="15" y="4" width="24" height="32" rx="2" fill="#50A0E8"/><path d="M15 10h24v4l-12 8-12-8v-4z" fill="white" opacity="0.9"/><path d="M15 14l12 8 12-8v18H15V14z" fill="white" opacity="0.15"/><ellipse cx="10" cy="22" rx="6" ry="7" fill="white"/><ellipse cx="10" cy="22" rx="3.5" ry="4.5" fill="#0078D4"/></svg>';
  
    /* ── POC: Gmail connect flow (replaces complex integration modal) ── */
    function openConnectGmailModal() {
      document.getElementById('modal-connect-gmail').classList.remove('hidden');
    }
  
    function closeConnectGmailModal() {
      document.getElementById('modal-connect-gmail').classList.add('hidden');
    }
  
    function proceedToOAuth() {
      closeConnectGmailModal();
      showToast('Successfully connected Gmail integration.');
      document.getElementById('import-modal-logo').innerHTML = gmailLogoLg;
      document.getElementById('modal-import').classList.remove('hidden');
    }
  
    function finishImport() {
      document.getElementById('modal-import').classList.add('hidden');
      showEmailConnected(true); // import → show threads
    }
  
    function skipImport() {
      document.getElementById('modal-import').classList.add('hidden');
      showEmailConnected(false); // skip → empty state
    }
  
    function showEmailConnected(withThreads) {
      document.getElementById('email-disconnected-state').style.display = 'none';
      document.getElementById('email-connected-state').style.display = 'block';
      document.getElementById('email-empty-state').style.display = withThreads ? 'none' : '';
      document.getElementById('email-thread-list').style.display = withThreads ? '' : 'none';
    }
  
    function disconnectGmail() {
      document.getElementById('email-dots-menu').style.display = 'none';
      document.getElementById('email-disconnected-state').style.display = '';
      document.getElementById('email-connected-state').style.display = 'none';
    }
  
    // Legacy — kept so existing references don't break
    function connectEmail(provider) { openConnectGmailModal(); }
    function closeIntegModal() {}
    function saveIntegrationSettings() {}
  
    // ── Toast notification ──
    var _toastTimer = null;
    function showToast(msg) {
      var t = document.getElementById('toast-notification');
      t.querySelector('.toast-msg').textContent = msg;
      t.classList.add('visible');
      clearTimeout(_toastTimer);
      _toastTimer = setTimeout(function() { t.classList.remove('visible'); }, 4000);
    }
    function closeToast() {
      document.getElementById('toast-notification').classList.remove('visible');
      clearTimeout(_toastTimer);
    }
  
    // ── Meeting detail panel ──
    var GRAY_AVATAR = 'https://ui-avatars.com/api/?size=250&background=4c525a&color=ffffff&format=png&name=';
    var meetingData = [
      {
        title: 'Q2 Campaign Kickoff — Northside Hotel',
        date: 'Thu, Feb 19  3:00 PM', duration: '1h 15m', hasRecording: true,
        owner: { name: 'Lucas Didier', img: GRAY_AVATAR + 'LD' },
        invitees: [
          { name: 'Rachel Torres', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
          { name: 'James Okonkwo', img: 'https://randomuser.me/api/portraits/men/36.jpg' },
          { name: 'Chris Taylor', img: 'https://randomuser.me/api/portraits/men/62.jpg' }
        ],
        recap: 'The team aligned on creative direction and deliverables for the Q2 spring campaign targeting leisure and family travelers. Lucas walked the Northside Hotel team through three mood board concepts and the group agreed to move forward with the "Sun & Escape" direction. Budget allocation, asset timelines, and the approval workflow were confirmed. A revised creative brief will be shared by Friday.',
        chapters: [
          { title: 'Campaign Theme Selection', content: 'Three creative directions were presented — "Urban Explorer," "Sun & Escape," and "Hidden Gem." The client preferred "Sun & Escape" for its alignment with the spring leisure booking window and its warm, aspirational visual tone. The team also agreed to test an outdoor rooftop pool hero shot as the primary image.' },
          { title: 'Budget & Timeline Confirmation', content: 'A $52K production budget was approved for photography, short-form video, and paid social creative. Key milestone: final asset delivery by March 14 for a March 28 campaign launch across Instagram, Meta, and Google Display.' },
          { title: 'Approval Workflow & Stakeholders', content: 'Rachel will act as single point of contact for approvals. Two review rounds agreed upon. Lucas will set up a shared Figma link for async feedback on design iterations.' }
        ],
        nextSteps: [
          'Lucas: Share revised creative brief with "Sun & Escape" direction — due Feb 21',
          'Rachel: Confirm rooftop pool photography availability with hotel ops team',
          'James: Book and brief freelance photographer — target shoot date Mar 1–2',
          'Lucas: Set up shared Figma workspace and invite client stakeholders'
        ],
        transcript: [
          { speaker: 'Lucas Didier', time: '0:12', text: 'Thanks everyone for joining — excited to finally get into the creative. We\'ve put a lot of thinking into these three directions and I\'m curious where your gut takes you after seeing them.' },
          { speaker: 'Rachel Torres', time: '0:34', text: 'We were actually looking at the preview deck this morning as a team. There was a pretty clear favorite already.' },
          { speaker: 'Lucas Didier', time: '0:52', text: 'Great to hear. Let me share my screen so we can walk through each one properly before we land on anything.' },
          { speaker: 'James Okonkwo', time: '1:08', text: 'One thing I want to flag — our CMO may jump in briefly around the 20-minute mark. She wanted to weigh in on the visual direction before we commit.' },
          { speaker: 'Lucas Didier', time: '1:18', text: 'Perfect, we\'ll make sure the mood boards are on screen at that point. Okay, so let\'s start with "Urban Explorer"...' },
          { speaker: 'Rachel Torres', time: '14:40', text: 'Honestly? I think "Sun & Escape" is the one. It feels like us. It\'s what our guests are actually dreaming about when they book a spring weekend.' },
          { speaker: 'Lucas Didier', time: '14:55', text: 'That\'s the reaction we were hoping for. It also gives us the most creative flexibility for paid social — short Reels, static hero images, and a 15-second bumper all live comfortably in that world.' }
        ]
      },
      {
        title: 'Full-Service Proposal Presentation — Bloom Organics',
        date: 'Tue, Feb 17  2:00 PM', duration: '47m', hasRecording: true,
        owner: { name: 'Lucas Didier', img: GRAY_AVATAR + 'LD' },
        invitees: [
          { name: 'Priya Sharma', img: 'https://randomuser.me/api/portraits/women/22.jpg' },
          { name: 'Michael Fawler', img: GRAY_AVATAR + 'MF' }
        ],
        recap: 'Lucas presented Bloom Organics with a full-service agency proposal covering brand strategy, social media management, and paid performance. Priya expressed strong interest in the brand refresh workstream and the content retainer. The team reviewed three scope tiers and the client indicated they would move forward with the mid-tier "Growth" package pending internal sign-off. Follow-up call scheduled for next week.',
        chapters: [
          { title: 'Scope Overview & Positioning', content: 'Presented three packages: Essentials ($4.5K/mo), Growth ($8.2K/mo), and Scale ($14K/mo). Bloom\'s goals — brand consistency, TikTok growth, and SEO-driven content — mapped most closely to Growth. Lucas walked through exactly which deliverables are included at each tier.' },
          { title: 'Brand Refresh Workstream', content: 'Priya flagged that their current visual identity feels "dated and inconsistent." The proposal includes a 6-week brand refresh (logo refinement, color system, typography) as a standalone project at $12K, separate from the monthly retainer. This resonated strongly.' },
          { title: 'Paid Social & Performance Channel', content: 'Reviewed Meta and TikTok paid social strategy. Lucas presented benchmark CPMs and conversion rates from comparable CPG brands. Bloom currently has no paid social presence — the opportunity to build from zero was framed as a significant growth lever.' }
        ],
        nextSteps: [
          'Priya: Present proposal internally and confirm scope selection — target Feb 24',
          'Lucas: Send revised one-pager with Growth package deliverables broken out by month',
          'Lucas: Share 3 case studies from organic/wellness brand clients',
          'Michael: Prepare contract draft for Growth package + brand refresh project'
        ],
        transcript: [
          { speaker: 'Lucas Didier', time: '0:10', text: 'Priya, Michael — thanks so much for the time today. Before we jump in, I want to frame how we put this proposal together. We spent time really mapping your goals to what we think will move the needle, rather than pitching everything we do.' },
          { speaker: 'Priya Sharma', time: '0:35', text: 'That\'s exactly what I was hoping to hear. We\'ve had proposals before that felt like a menu — we just want someone to tell us what we actually need.' },
          { speaker: 'Lucas Didier', time: '0:50', text: 'Then we\'re on the same page. Let me walk you through the three tiers and where we think Bloom sits...' },
          { speaker: 'Michael Fawler', time: '22:14', text: 'The brand refresh piece is interesting. How long does that typically take and what does the process look like on our end?' },
          { speaker: 'Lucas Didier', time: '22:30', text: 'Great question. It\'s a six-week sprint. Week one is discovery and audit, weeks two through four are concept and design, and the final two weeks are refinement and asset handoff. Your involvement is mainly two review sessions — we try to keep the lift on your side very low.' }
        ]
      },
      {
        title: 'Q4 Campaign Review & 2026 Planning — Vertex Legal',
        date: 'Sat, Feb 14  10:00 AM', duration: '1h 30m', hasRecording: true,
        owner: { name: 'Lucas Didier', img: GRAY_AVATAR + 'LD' },
        invitees: [
          { name: 'Tom Bradley', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { name: 'Alice Chen', img: GRAY_AVATAR + 'AC' },
          { name: 'Michael Fawler', img: GRAY_AVATAR + 'MF' },
          { name: 'Sara Lopez', img: 'https://randomuser.me/api/portraits/women/28.jpg' }
        ],
        recap: 'Comprehensive Q4 performance review with Vertex Legal followed by 2026 annual planning. The paid search campaign exceeded lead volume targets by 22% while CPL improved from $310 to $247. The team reviewed what worked (LinkedIn Thought Leadership ads, landing page refresh), what didn\'t (display retargeting underperformed), and aligned on a 2026 strategy focused on SEO authority building and two major campaign moments in Q1 and Q3.',
        chapters: [
          { title: 'Q4 Paid Search Performance', content: 'Total leads from paid search: 186, up from 152 in Q3. CPL improved to $247 from $310. Best performing keywords were intent-driven, long-tail terms around M&A advisory and employment law. Google Quality Score improved across all campaigns after the landing page refresh in November.' },
          { title: 'LinkedIn Thought Leadership Campaign', content: 'The three Sponsored Articles published in October–November drove 4,200 impressions and generated 31 qualified form fills at a $180 CPL — well below benchmark. The "Legal Risk in Remote Teams" piece was the top performer with a 3.8% CTR. Recommending we scale this format in 2026.' },
          { title: '2026 Strategy: SEO Authority Building', content: 'Proposing a 12-month content program targeting 40 high-intent search terms across practice areas. Current domain authority is 34 — target is 48 by end of 2026. Will require 6 long-form articles/month plus link-building outreach.' },
          { title: 'Campaign Moments: Q1 & Q3' }
        ],
        nextSteps: [
          'Lucas: Deliver 2026 Annual Strategy Deck by Feb 18',
          'Tom: Share 2026 marketing budget allocation by end of this week',
          'Alice: Confirm Q1 campaign theme with partnership team — deadline Feb 17',
          'Lucas: Begin keyword research for SEO content program'
        ],
        transcript: [
          { speaker: 'Lucas Didier', time: '0:15', text: 'Let\'s start with the numbers because I think they tell a really positive story, then we\'ll get into what\'s driving the improvements and how we carry that into 2026.' },
          { speaker: 'Tom Bradley', time: '0:30', text: 'The CPL improvement is the thing that jumped out at me when you sent the preliminary numbers. $247 is well below where we started the year.' },
          { speaker: 'Lucas Didier', time: '0:45', text: 'Exactly — and that\'s not just optimization, it\'s structural. The landing page refresh in November was a significant factor. Before that change, we were seeing 2.1% conversion on paid traffic. After? 3.4%. That\'s where most of the CPL improvement comes from.' },
          { speaker: 'Alice Chen', time: '18:22', text: 'On the LinkedIn piece — can we do more of that? The thought leadership format feels really aligned with how our partners want to show up.' },
          { speaker: 'Lucas Didier', time: '18:40', text: 'One hundred percent. That\'s actually my core recommendation for Q1. We scale from three articles to eight, and we start targeting CFOs and HR Directors specifically, not just general legal audiences.' }
        ]
      },
      {
        title: 'Intro Call – Coastal Realty Group',
        date: 'Thu, Feb 12  4:30 PM', duration: '30m', hasRecording: true,
        owner: { name: 'Lucas Didier', img: GRAY_AVATAR + 'LD' },
        invitees: [
          { name: 'Chris Taylor', img: 'https://randomuser.me/api/portraits/men/62.jpg' }
        ],
        recap: 'Initial discovery call with Coastal Realty Group. Chris Taylor, Head of Marketing, reached out via referral from Vertex Legal. The agency is looking for support with brand positioning, a website redesign, and a content strategy to differentiate from competing boutique agencies in the Pacific Northwest. Strong fit. Proposal to be drafted and sent within one week.',
        chapters: [
          { title: 'Current Challenges & Pain Points', content: 'Coastal currently manages all marketing in-house with one marketing coordinator. The website hasn\'t been updated since 2022. Chris flagged that listings are visually impressive but the brand doesn\'t communicate their premium positioning — they lose deals to competitors who "look more established online."' },
          { title: 'Goals & Success Metrics', content: 'Primary goal: reposition as a premium boutique agency for $2M+ residential properties. Secondary: improve lead quality from the website — currently high volume but low qualification. Chris mentioned they get 80+ web inquiries/month but convert fewer than 5.' },
          { title: 'Scope Discussion & Next Steps' }
        ],
        nextSteps: [
          'Lucas: Send agency credentials deck and 2 real estate rebrand case studies',
          'Lucas: Draft full proposal with scope options by Feb 19',
          'Chris: Share current website analytics access (Google Analytics 4)'
        ],
        transcript: [
          { speaker: 'Lucas Didier', time: '0:08', text: 'Chris, thanks for making the time. Tom spoke really highly of you — always good to come in with a warm referral.' },
          { speaker: 'Chris Taylor', time: '0:20', text: 'Tom\'s been raving about you guys for months. Honestly the work you did on their brand is what made me reach out. We have a similar challenge — we have a great product but our brand doesn\'t reflect it.' },
          { speaker: 'Lucas Didier', time: '0:40', text: 'That\'s actually one of our favorite problems to solve. Walk me through what "great product" looks like for Coastal — what should someone feel when they encounter your brand for the first time?' },
          { speaker: 'Chris Taylor', time: '1:02', text: 'Premium. Trusted. Local but sophisticated. Right now our website looks like... any other real estate site. We blend into the background.' }
        ]
      },
      {
        title: 'Monthly Performance Check-in — Bloom Organics',
        date: 'Tue, Feb 10  11:00 AM', duration: '45m', hasRecording: false,
        owner: { name: 'Lucas Didier', img: GRAY_AVATAR + 'LD' },
        invitees: [
          { name: 'Priya Sharma', img: 'https://randomuser.me/api/portraits/women/22.jpg' },
          { name: 'Sara Lopez', img: 'https://randomuser.me/api/portraits/women/28.jpg' }
        ],
        recap: 'Monthly check-in with Bloom Organics to review January social and content performance and plan February priorities. Instagram Reels engagement improved 31% YoY while TikTok growth remained flat. The "5-Ingredient Recipe" post format was the clear winner. The team agreed to test a new "Behind the Farm" UGC series in February and confirmed the February content calendar is approved.',
        chapters: [
          { title: 'January Performance Highlights', content: 'Instagram Reels average engagement rate: 4.2%, up from 3.2% in January 2025. Best single post: "5 Ingredients, 15 Minutes" Reel with 18K plays and 2.1% saves rate. TikTok net new followers: +180 (flat vs. target of +600). Pinterest referral traffic to Bloom website up 18% month-over-month.' },
          { title: '"Behind the Farm" UGC Series Proposal', content: 'Lucas pitched a 4-week series filming at Bloom\'s Redwood Valley supplier farm. Goal: authentic, lo-fi content to drive TikTok growth. Priya approved a 2-day shoot budget ($3,200) and confirmed availability in mid-March.' },
          { title: 'February Content Calendar Sign-Off', content: 'All 24 planned posts for February were approved with minor copy tweaks on 3 items. Sara will brief the design team by Feb 12. Post scheduling goes live Feb 14.' }
        ],
        nextSteps: [
          'Sara: Brief design team on February content calendar — due Feb 12',
          'Lucas: Draft UGC series brief and production shot list for farm shoot',
          'Priya: Introduce Lucas to the Redwood Valley farm supplier contact',
          'Lucas: Create TikTok A/B test plan — lo-fi vs. polished content — for March'
        ],
        transcript: [
          { speaker: 'Priya Sharma', time: '0:06', text: 'Morning! Okay, I just pulled up the January dashboard — the Reels numbers look really good.' },
          { speaker: 'Lucas Didier', time: '0:18', text: 'Right? The "5 Ingredients" format we tested in week three was our best-performing post by a wide margin. The saves rate tells us people are actually using the recipe — that\'s the engagement signal we care about.' },
          { speaker: 'Sara Lopez', time: '0:45', text: 'TikTok though. We\'re just not finding our groove there. 180 followers for a whole month is not good.' },
          { speaker: 'Lucas Didier', time: '0:58', text: 'Agreed — and I want to propose a real pivot on TikTok strategy today. I think the polished content we\'ve been posting doesn\'t fit the platform. I have a concept I want to walk you through.' }
        ]
      },
      {
        title: 'Brand Identity Review — Vertex Legal',
        date: 'Sat, Feb 7  2:00 PM', duration: '1h', hasRecording: false,
        owner: { name: 'Lucas Didier', img: GRAY_AVATAR + 'LD' },
        invitees: [
          { name: 'Alice Chen', img: GRAY_AVATAR + 'AC' },
          { name: 'Tom Bradley', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { name: 'Michael Fawler', img: GRAY_AVATAR + 'MF' }
        ],
        recap: 'Major brand identity presentation for Vertex Legal\'s full rebrand project. The team presented the refined logo system, color palette, typography, and brand voice guidelines. The client approved the primary logo direction with a request to lighten the wordmark weight slightly. The brand voice pillar "Empowering" will be revised to "Confident" to better reflect their litigation-heavy practice. Brand guidelines document to be finalized by Feb 15.',
        chapters: [
          { title: 'Logo System Presentation', content: 'Three logo variants presented: primary horizontal lockup, stacked monogram, and icon-only mark. Client approved the horizontal lockup. Request: lighten wordmark weight from 600 to 500. The monogram will be used as a secondary mark for embossed materials and swag.' },
          { title: 'Color Palette & Typography', content: 'Deep navy (#0E1C36) as primary, warm gold (#C9A84C) as accent, off-white (#F8F7F4) for backgrounds. Typography: Canela Display for headers with Söhne for body text. Client described the pairing as "authoritative but approachable" — exactly the brief.' },
          { title: 'Brand Voice & Messaging Framework', content: 'Four pillars: Precise, Confident, Human, Trusted (revised from "Empowering" per client feedback). Reviewed sample headline copy, partner bio format, and a LinkedIn article template. Tom flagged that the tone in the bio examples was slightly too casual — will revise.' },
          { title: 'Rollout Plan & Asset Priorities' }
        ],
        nextSteps: [
          'Lucas: Revise logo wordmark weight (600 → 500) and send updated files by Feb 10',
          'Lucas: Update brand voice pillar "Empowering" → "Confident" and rewrite examples',
          'Alice: Share internal feedback from the partnership team by Feb 9',
          'Tom: Book brand rollout kickoff session for week of Feb 16'
        ],
        transcript: [
          { speaker: 'Lucas Didier', time: '0:20', text: 'I\'m going to take you through the full identity system today — logo, color, type, and voice. And at the end we\'ll look at how it all comes together in a few real application examples.' },
          { speaker: 'Tom Bradley', time: '0:38', text: 'Looking forward to it. The brief said "authoritative but not cold" and I\'m curious how you translated that.' },
          { speaker: 'Lucas Didier', time: '0:50', text: 'That brief was actually the north star for every single decision. Let me show you why we landed on Canela for the display type — that choice does a lot of work...' },
          { speaker: 'Alice Chen', time: '32:15', text: 'I love the navy and gold together. It feels like Vertex. Like, immediately.' },
          { speaker: 'Michael Fawler', time: '32:28', text: 'Agreed. My only note is on the bio copy samples — they feel slightly too relaxed. Our partners are brilliant people but they\'re not known for being casual.' }
        ]
      },
      {
        title: 'Retainer Proposal — Northside Hotel',
        date: 'Thu, Feb 5  3:30 PM', duration: '37m', hasRecording: true,
        owner: { name: 'Lucas Didier', img: GRAY_AVATAR + 'LD' },
        invitees: [
          { name: 'Rachel Torres', img: 'https://randomuser.me/api/portraits/women/44.jpg' }
        ],
        recap: 'Presented the ongoing content retainer proposal to Northside Hotel following the Q2 campaign kickoff. The proposal covers monthly content production (photography, short-form video, copy), paid social management, and monthly reporting. Rachel confirmed the hotel\'s $9K/month retainer budget and indicated strong intent to proceed. A formal agreement will be drafted and sent by the end of the week.',
        chapters: [
          { title: 'Retainer Scope & Deliverables', content: 'Proposed retainer: 8 Reels/month, 12 static posts, monthly paid social management (up to $15K ad spend), a quarterly performance report, and a dedicated account manager. Total: $8,800/month. Rachel confirmed this was within budget.' },
          { title: 'Pricing & Contract Terms', content: 'Three-month minimum commitment with a 30-day notice clause thereafter. 10% discount applied for 12-month commitment upfront ($95,000 vs $105,600). Rachel indicated she\'d prefer to start month-to-month and review at the three-month mark.' },
          { title: 'Onboarding & Kickoff Timeline' }
        ],
        nextSteps: [
          'Michael: Draft retainer agreement and send for review — due Feb 7',
          'Lucas: Send onboarding questionnaire and asset request list to Rachel',
          'Rachel: Confirm preferred contract start date (March 1 or March 15)'
        ],
        transcript: [
          { speaker: 'Lucas Didier', time: '0:15', text: 'So following the campaign kickoff last week, we wanted to come back with a proposal for ongoing support. The idea is to capture momentum from Q2 and carry it through the year.' },
          { speaker: 'Rachel Torres', time: '0:32', text: 'That\'s exactly what I was hoping for. The campaign planning process was really smooth — I want that same energy on an ongoing basis.' },
          { speaker: 'Lucas Didier', time: '0:48', text: 'Perfect. Let me walk you through what we\'re proposing and how it maps to your goals...' },
          { speaker: 'Rachel Torres', time: '18:05', text: 'The $8,800 is within our range. My concern is more about the minimum commitment — we\'ve had bad experiences before with agencies where it felt like we were locked in.' },
          { speaker: 'Lucas Didier', time: '18:22', text: 'Completely fair. Let\'s do three months to start, no strings attached. If you\'re not seeing value at the 90-day mark, you walk away with no hard feelings. I\'m confident enough in the work that I\'m not worried about that.' }
        ]
      },
      {
        title: 'Onboarding Session – Week 1 — Bloom Organics',
        date: 'Thu, Jan 29  2:00 PM', duration: '55m', hasRecording: false,
        owner: { name: 'Lucas Didier', img: GRAY_AVATAR + 'LD' },
        invitees: [
          { name: 'Priya Sharma', img: 'https://randomuser.me/api/portraits/women/22.jpg' },
          { name: 'Sara Lopez', img: 'https://randomuser.me/api/portraits/women/28.jpg' }
        ],
        recap: 'First onboarding session for Bloom Organics covering brand review, account setup, and the content workflow. Lucas walked both Priya and Sara through the monthly collaboration process — briefing, production, approval cycles, and scheduling. Brand asset library reviewed and gaps identified (no master logo file in SVG format, no approved font files). Content calendar template shared and explained.',
        chapters: [
          { title: 'Brand Asset Review', content: 'Reviewed all provided brand assets. Gaps identified: no SVG master logo, only a low-res JPEG exists. No licensed font files provided. Priya will chase the original designer. Interim: Lucas will use system-match fonts until proper files are received.' },
          { title: 'Monthly Workflow Walkthrough', content: 'Introduced the 4-week content cycle: Week 1 briefs and concepts, Week 2 production, Week 3 client review (2-round max), Week 4 scheduling and publishing. Sara will be the primary approver for all content. Response window: 48 hours per review round.' },
          { title: 'Platform Setup & Access', content: 'Lucas granted editor access to Instagram and TikTok business accounts. Meta Business Manager access pending — Priya needs to add Lucas\'s agency account. Pinterest business account needs to be created (currently personal). Later Analytics and Later scheduling tool set up.' }
        ],
        nextSteps: [
          'Priya: Locate original logo files and send to Lucas (SVG + AI formats)',
          'Priya: Add agency to Meta Business Manager as partner account',
          'Sara: Review and approve February brief template by Feb 2',
          'Lucas: Create Pinterest business account and connect to Bloom brand profile'
        ],
        transcript: [
          { speaker: 'Lucas Didier', time: '0:12', text: 'Welcome to the team, officially! We\'re going to spend today getting all the foundations in place so that when we get to actual content, everything runs smoothly.' },
          { speaker: 'Sara Lopez', time: '0:28', text: 'We\'re really excited. The brand has been a bit scattered across platforms — it\'ll be great to have someone make sense of it.' },
          { speaker: 'Lucas Didier', time: '0:42', text: 'That\'s exactly what this first session is about. Let\'s start with the brand assets you have and do an honest audit together...' }
        ]
      },
      {
        title: 'MarTech Stack Review — Vertex Legal',
        date: 'Thu, Jan 22  3:00 PM', duration: '1h 10m', hasRecording: true,
        owner: { name: 'Lucas Didier', img: GRAY_AVATAR + 'LD' },
        invitees: [
          { name: 'Tom Bradley', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { name: 'Alice Chen', img: GRAY_AVATAR + 'AC' },
          { name: 'Michael Fawler', img: GRAY_AVATAR + 'MF' }
        ],
        recap: 'Deep dive into Vertex Legal\'s existing marketing technology stack. The session revealed significant gaps: no CRM integration with the website, Google Tag Manager deployed but only 4 of 12 required tags firing, and zero conversion tracking on the Google Ads account. Lucas recommended a 3-week technical audit before any paid media spend is increased. A HubSpot implementation was proposed as the foundation for the 2026 growth plan.',
        chapters: [
          { title: 'Current Stack Audit Findings', content: 'Identified 6 tools in use: WordPress, Google Analytics 4 (misconfigured), Google Tag Manager, Mailchimp, Google Ads (untracked), LinkedIn Ads. No CRM. No heat mapping. No session recording. GA4 is missing key events: form submissions, phone click tracking, and scroll depth. Effectively flying blind on conversion data.' },
          { title: 'Google Ads Conversion Tracking Gap', content: 'Current campaigns have spent $38K in the past 6 months with zero conversion tracking. Lucas emphasized that without conversion data, optimization is impossible. Recommended: pause all ad spend above maintenance level until tracking is fixed. Estimated setup time: 3–4 business days.' },
          { title: 'HubSpot Implementation Proposal', content: 'Proposed HubSpot CRM + Marketing Hub Starter as the central platform. Would unify contact tracking, form fills, email nurture, and ad attribution in one place. Implementation estimate: 6 weeks, $4,800 one-time setup fee. Monthly cost: $890 (HubSpot) + included in retainer.' },
          { title: 'Technical Roadmap & Priorities' }
        ],
        nextSteps: [
          'Lucas: Deliver full technical audit report — due Jan 29',
          'Tom: Pause Google Ads spend above $500/month until tracking is live',
          'Alice: Grant HubSpot trial account setup access to Lucas',
          'Lucas: Schedule GA4 and GTM fix session with Tom for week of Feb 2'
        ],
        transcript: [
          { speaker: 'Lucas Didier', time: '0:10', text: 'So I want to be upfront — what I found in the audit is more significant than I expected. There are some real gaps here that are costing you money right now.' },
          { speaker: 'Tom Bradley', time: '0:28', text: 'Well, better to know than not know. Give us the full picture.' },
          { speaker: 'Lucas Didier', time: '0:38', text: 'Okay. Let\'s start with the most urgent one: Google Ads. You\'ve spent $38,000 in the last six months with no conversion tracking whatsoever. That means Google\'s algorithm has been optimizing for... nothing. It has no idea what a good outcome looks like for your business.' },
          { speaker: 'Alice Chen', time: '1:05', text: 'Oh. That\'s... not good.' },
          { speaker: 'Lucas Didier', time: '1:10', text: 'No, but it\'s fixable. And once it is, I\'d expect CPL to drop significantly just from the optimization improvement alone. Silver lining: you have a lot of upside here.' }
        ]
      },
      {
        title: 'Discovery Call — Coastal Realty Group',
        date: 'Thu, Jan 15  4:00 PM', duration: '25m', hasRecording: true,
        owner: { name: 'Lucas Didier', img: GRAY_AVATAR + 'LD' },
        invitees: [
          { name: 'Chris Taylor', img: 'https://randomuser.me/api/portraits/men/62.jpg' }
        ],
        recap: 'Initial discovery call with Coastal Realty Group, a Pacific Northwest boutique real estate agency referred by Vertex Legal. Chris Taylor, Head of Marketing, described the core challenge: a strong property portfolio with a brand presence that doesn\'t reflect their premium market position. The agency is looking for a brand and digital partner for a full rebrand and website redesign. Strong alignment on goals and budget. Proposal to be drafted within 7 days.',
        chapters: [
          { title: 'Client Background & Business Context', content: 'Coastal Realty Group: 12-year-old boutique agency, 18 agents, focused on $2M+ residential properties in the Pacific Northwest. Revenue grew 24% in 2025 but brand hasn\'t kept pace. Losing premium listings to competitors who present better online and in pitch materials.' },
          { title: 'Core Pain Points', content: 'Three main challenges: (1) Website hasn\'t been updated since 2022 and doesn\'t reflect current brand positioning, (2) Brand assets are inconsistent — logo has multiple unofficial versions, no brand guide, (3) 80+ monthly web inquiries but <5% conversion rate due to poor UX and unclear positioning.' },
          { title: 'Scope & Budget Discussion', content: 'Budget range confirmed: $40–55K for a full brand refresh + website redesign. Timeline: ideally live by late April for the spring selling season. Chris also mentioned interest in ongoing SEO and content support post-launch.' }
        ],
        nextSteps: [
          'Lucas: Send agency credentials deck and 2 real estate brand case studies — due Jan 17',
          'Lucas: Draft full proposal with two scope options by Jan 22',
          'Chris: Share current website login and Google Analytics access'
        ],
        transcript: [
          { speaker: 'Lucas Didier', time: '0:10', text: 'Chris, thanks so much for reaching out — Tom had nothing but good things to say. Tell me about Coastal. What does the business look like right now?' },
          { speaker: 'Chris Taylor', time: '0:25', text: 'We\'re in a really good place commercially — 2025 was our best year by revenue. But the brand... it\'s been an afterthought, honestly. Our website looks like every other real estate site.' },
          { speaker: 'Lucas Didier', time: '0:48', text: 'That\'s actually a really common inflection point for agencies at your stage. The product is great, the business is growing, but the outward presentation hasn\'t caught up. What does "looking premium" mean to you specifically?' },
          { speaker: 'Chris Taylor', time: '1:10', text: 'Think of the difference between a boutique hotel and a Holiday Inn. Same function, completely different feel. We want to be the boutique hotel. Right now we\'re the Holiday Inn.' },
          { speaker: 'Lucas Didier', time: '1:28', text: 'That\'s a perfect brief. And I\'d say it\'s very achievable. Let me ask about timeline — do you have a hard deadline in mind?' }
        ]
      }
    ];
  
    function openMeetingPanel(idx) {
      var d = meetingData[idx];
  
      // Title + top-bar meta
      document.getElementById('mdp-title').textContent = d.title;
      document.getElementById('mdp-date').textContent = d.date;
      document.getElementById('mdp-duration').textContent = d.duration;
  
      // Video player
      var videoWrap = document.getElementById('mdp-video-wrap');
      videoWrap.style.display = d.hasRecording ? '' : 'none';
  
      // Owner row
      document.getElementById('mdp-owner-row').innerHTML =
        '<div class="meetings-user-avatar" style="width:24px;height:24px;background-image:url(\'' + d.owner.img + '\');"></div>'
        + '<span class="mdp-meta-owner-name">' + d.owner.name + ' (Me)</span>';
  
      // Invitees stack
      var invHtml = d.invitees.map(function(inv) {
        return '<div class="meetings-user-avatar" style="width:24px;height:24px;background-image:url(\'' + inv.img + '\');" title="' + inv.name + '"></div>';
      }).join('');
      document.getElementById('mdp-invitees-stack').innerHTML = invHtml;
  
      // Quick Recap
      document.getElementById('mdp-recap').textContent = d.recap || '';
  
      // Chapters
      var chapHtml = '';
      if (d.chapters && d.chapters.length) {
        d.chapters.forEach(function(ch, i) {
          var hasContent = !!ch.content;
          chapHtml += '<div class="mdp-chapter">'
            + '<div class="mdp-chapter-header" onclick="toggleMdpChapter(this)">'
            + '<svg class="mdp-chapter-chevron' + (i === 0 && hasContent ? ' open' : '') + '" width="16" height="16" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.654 11.498L7.12 4.889C6.957 4.726 6.96 4.456 7.128 4.29L8.297 3.128C8.465 2.961 8.738 2.957 8.903 3.12L16.882 11.194C16.968 11.278 17.007 11.392 16.999 11.502C17.003 11.616 16.964 11.726 16.882 11.81L8.903 19.88C8.738 20.043 8.465 20.039 8.297 19.872L7.128 18.711C6.96 18.544 6.957 18.274 7.12 18.111L13.654 11.498Z" fill="currentColor"/></svg>'
            + '<span class="mdp-chapter-title">' + ch.title + '</span>'
            + '</div>';
          if (hasContent) {
            chapHtml += '<div class="mdp-chapter-content' + (i === 0 ? ' open' : '') + '">' + ch.content + '</div>';
          }
          chapHtml += '</div>';
        });
      }
      document.getElementById('mdp-chapters').innerHTML = chapHtml;
      document.getElementById('mdp-chapters-section').style.display = (d.chapters && d.chapters.length) ? '' : 'none';
  
      // Next Steps
      var stepsHtml = '';
      if (d.nextSteps && d.nextSteps.length) {
        d.nextSteps.forEach(function(step) {
          stepsHtml += '<div class="mdp-next-step">'
            + '<span class="mdp-next-step-arrow">→</span>'
            + '<span>' + step + '</span>'
            + '</div>';
        });
      }
      document.getElementById('mdp-nextsteps').innerHTML = stepsHtml;
      document.getElementById('mdp-nextsteps-section').style.display = (d.nextSteps && d.nextSteps.length) ? '' : 'none';
  
      // Transcript
      var txHtml = '';
      if (d.transcript && d.transcript.length) {
        d.transcript.forEach(function(block) {
          txHtml += '<div class="mdp-transcript-block">'
            + '<div class="mdp-transcript-meta">'
            + '<span class="mdp-transcript-speaker">' + block.speaker + '</span>'
            + '<span class="mdp-transcript-time">' + block.time + '</span>'
            + '</div>'
            + '<p class="mdp-transcript-text">' + block.text + '</p>'
            + '</div>';
        });
      } else {
        txHtml = '<div class="mdp-no-transcript">No transcript available for this meeting.</div>';
      }
      document.getElementById('mdp-transcript').innerHTML = txHtml;
  
      // Reset to summary tab
      switchMdpTab('summary', document.querySelector('.mdp-subnav-item'));
  
      // Close dots menu
      document.getElementById('mdp-top-dropdown').classList.remove('open');
  
      document.getElementById('meeting-detail-panel').classList.add('open');
    }
  
    function closeMeetingPanel() {
      document.getElementById('meeting-detail-panel').classList.remove('open');
      document.getElementById('mdp-top-dropdown').classList.remove('open');
    }
  
    function switchMdpTab(tab, el) {
      document.querySelectorAll('.mdp-subnav-item').forEach(function(t) { t.classList.remove('active'); });
      if (el) el.classList.add('active');
      var summaryPanel = document.getElementById('mdp-tab-summary');
      var transcriptPanel = document.getElementById('mdp-tab-transcript');
      if (tab === 'summary') {
        summaryPanel.hidden = false;
        transcriptPanel.hidden = true;
      } else {
        summaryPanel.hidden = true;
        transcriptPanel.hidden = false;
      }
    }
  
    function toggleMdpChapter(headerEl) {
      var content = headerEl.nextElementSibling;
      var chevron = headerEl.querySelector('.mdp-chapter-chevron');
      if (!content) return;
      var isOpen = content.classList.contains('open');
      content.classList.toggle('open', !isOpen);
      chevron.classList.toggle('open', !isOpen);
    }
  
    function toggleMdpMenu(e) {
      e.stopPropagation();
      document.getElementById('mdp-top-dropdown').classList.toggle('open');
    }
  
    document.addEventListener('click', function(e) {
      var dd = document.getElementById('mdp-top-dropdown');
      if (dd && !dd.closest('.mdp-dots-wrap').contains(e.target)) {
        dd.classList.remove('open');
      }
    });
  
    function selectSharingOption(el) {
      var section = el.closest('.sharing-section');
      section.querySelectorAll('.sharing-option').forEach(function(o) { o.classList.remove('selected'); });
      el.classList.add('selected');
    }
  
    // Close modals on overlay click
    document.getElementById('modal-integration').addEventListener('click', function(e) {
      if (e.target === this) closeIntegModal();
    });
    document.getElementById('modal-import').addEventListener('click', function(e) {
      if (e.target === this) skipImport();
    });
  
    // ── Note menu (... button) ──
    function toggleNoteMenu(btn) {
      var dropdown = btn.nextElementSibling;
      var isOpen = dropdown.classList.contains('open');
      closeAllNoteMenus();
      if (!isOpen) dropdown.classList.add('open');
      event.stopPropagation();
    }
    function closeAllNoteMenus() {
      document.querySelectorAll('.note-dropdown').forEach(function(d) { d.classList.remove('open'); });
    }
    document.addEventListener('click', closeAllNoteMenus);
  
    // ── Add note composer ──
    function showNoteComposer() {
      document.getElementById('note-add-toggle').style.display = 'none';
      var composerSlot = document.getElementById('note-composer');
      composerSlot.innerHTML = getNoteComposerHTML('add');
      composerSlot.style.display = 'block';
      composerSlot.querySelector('.note-composer-body').focus();
    }
  
    function getNoteComposerHTML(mode) {
      return '<div class="note-edit-area">'
        + '<div class="note-composer-toolbar">'
        + '<button class="note-composer-toolbar-btn" title="Bold"><strong>B</strong></button>'
        + '<button class="note-composer-toolbar-btn" title="Italic"><em>i</em></button>'
        + '<button class="note-composer-toolbar-btn" title="Underline"><u>U</u></button>'
        + '<button class="note-composer-toolbar-btn" title="Strikethrough"><s>S</s></button>'
        + '<button class="note-composer-toolbar-btn" title="Font size" style="font-size:12px;">A<sub style="font-size:9px;">i</sub></button>'
        + '<div class="note-composer-toolbar-sep"></div>'
        + '<button class="note-composer-toolbar-btn" title="Link"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></button>'
        + '<button class="note-composer-toolbar-btn" title="Ordered list"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4M4 10H6M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg></button>'
        + '<button class="note-composer-toolbar-btn" title="Bullet list"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none"/></svg></button>'
        + '<div class="note-composer-toolbar-sep"></div>'
        + '<button class="note-composer-toolbar-btn" title="Image"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></button>'
        + '<button class="note-composer-toolbar-btn" title="Attachment"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg></button>'
        + '<button class="note-composer-toolbar-btn" title="More"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>'
        + '</div>'
        + '<div class="note-composer-body" contenteditable="true" data-placeholder="Write a note..."></div>'
        + '<div class="note-composer-actions">'
        + '<button class="btn btn-default btn-smd" onclick="cancelNoteEdit(this)" data-mode="' + mode + '">Cancel</button>'
        + '<button class="btn btn-primary btn-smd">Save Changes</button>'
        + '</div>'
        + '</div>';
    }
  
    function cancelNoteEdit(btn) {
      var mode = btn.getAttribute('data-mode');
      if (mode === 'add') {
        document.getElementById('note-composer').style.display = 'none';
        document.getElementById('note-composer').innerHTML = '';
        document.getElementById('note-add-toggle').style.display = 'flex';
      } else if (mode === 'activity-add') {
        var wrap = document.getElementById('activity-note-composer-wrap');
        wrap.style.display = 'none';
        wrap.innerHTML = '';
      } else {
        var editArea = btn.closest('.note-edit-area');
        var noteItem = btn.closest('.note-item, .activity-item');
        var noteBody = noteItem.querySelector('.note-item-body, .activity-item-body');
        editArea.remove();
        var noteText = noteBody.querySelector('.note-text, .activity-text');
        if (noteText) noteText.style.display = '';
      }
    }
  
    // ── Edit a note ──
    function editNote(link) {
      closeAllNoteMenus();
      var noteItem = link.closest('.note-item, .activity-item');
      var noteText = noteItem.querySelector('.note-text, .activity-text');
      var originalText = noteText ? noteText.textContent.trim() : '';
      if (noteText) noteText.style.display = 'none';
      var noteBody = noteItem.querySelector('.note-item-body, .activity-item-body');
      var wrapper = document.createElement('div');
      wrapper.innerHTML = getNoteComposerHTML('edit');
      var editArea = wrapper.firstChild;
      editArea.querySelector('.note-composer-body').textContent = originalText;
      noteBody.appendChild(editArea);
      noteBody.querySelector('.note-composer-body').focus();
    }
  
    // ── Delete a note ──
    var _noteItemToDelete = null;
    function deleteNote(link) {
      closeAllNoteMenus();
      _noteItemToDelete = link.closest('.note-item, .activity-item');
      document.getElementById('delete-note-modal').classList.remove('hidden');
    }
    function confirmDeleteNote() {
      if (_noteItemToDelete) {
        _noteItemToDelete.remove();
        _noteItemToDelete = null;
      }
      closeDeleteModal();
    }
    function closeDeleteModal() {
      document.getElementById('delete-note-modal').classList.add('hidden');
    }

    // Expose functions to window for onClick handlers
    (window as any).switchTab = switchTab;
    (window as any).toggleAddMenu = toggleAddMenu;
    (window as any).showActivityNoteComposer = showActivityNoteComposer;
    (window as any).toggleAccessLevel = toggleAccessLevel;
    (window as any).toggleEmailDotsMenu = toggleEmailDotsMenu;
    (window as any).openManageAccess = openManageAccess;
    (window as any).openEmailSyncSettings = openEmailSyncSettings;
    (window as any).openComposePanel = openComposePanel;
    (window as any).toggleSharePopover = toggleSharePopover;
    (window as any).toggleShareAccessLevel = toggleShareAccessLevel;
    (window as any).renderEmailThread = renderEmailThread;
    (window as any).toggleThreadMsg = toggleThreadMsg;
    (window as any).renderEmailComments = renderEmailComments;
    (window as any).submitNoteFromTab = submitNoteFromTab;
    (window as any).switchComposeTab = switchComposeTab;
    (window as any).generateWithAI = generateWithAI;
    (window as any).cancelAI = cancelAI;
    (window as any).openEmailPanel = openEmailPanel;
    (window as any).closeEmailPanel = closeEmailPanel;
    (window as any).openReply = openReply;
    (window as any).closeReply = closeReply;
    (window as any).clearReply = clearReply;
    (window as any).discardDraft = discardDraft;
    (window as any).closeAllDropdowns = closeAllDropdowns;
    (window as any).openConnectGmailModal = openConnectGmailModal;
    (window as any).closeConnectGmailModal = closeConnectGmailModal;
    (window as any).proceedToOAuth = proceedToOAuth;
    (window as any).finishImport = finishImport;
    (window as any).skipImport = skipImport;
    (window as any).showEmailConnected = showEmailConnected;
    (window as any).disconnectGmail = disconnectGmail;
    (window as any).connectEmail = connectEmail;
    (window as any).closeIntegModal = closeIntegModal;
    (window as any).saveIntegrationSettings = saveIntegrationSettings;
    (window as any).showToast = showToast;
    (window as any).closeToast = closeToast;
    (window as any).openMeetingPanel = openMeetingPanel;
    (window as any).closeMeetingPanel = closeMeetingPanel;
    (window as any).switchMdpTab = switchMdpTab;
    (window as any).toggleMdpChapter = toggleMdpChapter;
    (window as any).toggleMdpMenu = toggleMdpMenu;
    (window as any).selectSharingOption = selectSharingOption;
    (window as any).toggleNoteMenu = toggleNoteMenu;
    (window as any).closeAllNoteMenus = closeAllNoteMenus;
    (window as any).showNoteComposer = showNoteComposer;
    (window as any).getNoteComposerHTML = getNoteComposerHTML;
    (window as any).cancelNoteEdit = cancelNoteEdit;
    (window as any).editNote = editNote;
    (window as any).deleteNote = deleteNote;
    (window as any).confirmDeleteNote = confirmDeleteNote;
    (window as any).closeDeleteModal = closeDeleteModal;

    // Cleanup
    return () => {
      document.removeEventListener('click', closeAllNoteMenus);
    };
  }, []);

  return (
    <>

<div id="outer-wrapper" className="with-sidebar with-sidebar-expanded">

  {/* ========== SIDEBAR ========== */}
  <div className="sidenav-container theme-default">
    <nav className="sidenav">
      <div className="sidenav-top-section">

        {/* Company switcher + collapse toggle */}
        <div className="sidenav-company-section">
          <div className="sidenav-company-menu">
            <div className="sidenav-company-menu-link">
              <div className="sidenav-company-menu-avatar avatar-img avatar-xs" style={{backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', borderRadius: '6px'}}>B</div>
              <div className="sidenav-company-menu-details">
                <div className="sidenav-navigation-company-name overflow-ellipsis">Bonsai Demo</div>
              </div>
              <svg className="sidenav-company-menu-arrow" width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 2.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="sidenav-company-switcher-collapse-toggle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M6 2v12"/></svg>
          </div>
        </div>

        {/* Search */}
        <div className="sidenav-top-section-search">
          <div className="form-field cursor-pointer relative input-sm with-icon sidenav-top-section-search-input">
            <svg className="sidenav-top-section-search-icon form-field-icon icon-left" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span className="sidenav-top-section-search-label">Search</span>
            <div className="sidenav-top-section-search-command-key">&#8984;K</div>
          </div>
        </div>

        {/* Top links */}
        <div className="sidenav-top-section-links">
          <a className="sidenav-features-item" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon home" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.285 17.1429V10.2862H6.85664V17.1429C6.85664 17.6162 6.4729 18 5.99954 18C5.52618 18 5.14244 17.6162 5.14244 17.1429V10.2862C5.14244 9.83154 5.32318 9.39567 5.64465 9.07419C5.96613 8.75272 6.40201 8.57199 6.85664 8.57199H10.285C10.7396 8.57199 11.1755 8.75272 11.497 9.07419C11.8184 9.39567 11.9992 9.83154 11.9992 10.2862V17.1429C11.9992 17.6162 11.6154 18 11.1422 18C10.6687 18 10.285 17.6162 10.285 17.1429Z" fill="#22AD01"/><path d="M15.4277 7.71384C15.4277 7.58923 15.4006 7.46611 15.3481 7.35309C15.2957 7.24 15.219 7.13977 15.1239 7.05929L15.1197 7.05512L9.12419 1.9159C8.96949 1.78515 8.77348 1.71419 8.57093 1.71419C8.36838 1.71419 8.17237 1.78599 8.01767 1.91674L2.02221 7.05512L2.01803 7.05929C1.92281 7.13977 1.84618 7.24 1.79371 7.35309C1.74127 7.46611 1.71419 7.58925 1.71419 7.71384V15.4276C1.71419 15.6549 1.80456 15.8737 1.96529 16.0345C2.12601 16.1952 2.34407 16.2848 2.57128 16.2848H14.5706C14.7979 16.2848 15.0159 16.1952 15.1766 16.0345C15.3373 15.8737 15.4277 15.6549 15.4277 15.4276V7.71384ZM17.1418 15.4276C17.1418 16.1097 16.8708 16.7643 16.3886 17.2464C15.9063 17.7285 15.2525 17.9989 14.5706 17.9989H2.57128C1.88944 17.9989 1.2355 17.7285 0.753307 17.2464C0.271103 16.7643 0 16.1097 0 15.4276V7.71384C0 7.34005 0.0812396 6.97065 0.23855 6.63159C0.395964 6.29235 0.625888 5.99165 0.911505 5.75022L6.90697 0.611018L6.91116 0.607662C7.37525 0.215428 7.96329 0 8.57093 0C9.10254 0 9.61903 0.164852 10.0508 0.468723L10.2307 0.607662L10.2349 0.611018L16.2303 5.75022L16.335 5.84313C16.5724 6.06709 16.7655 6.33472 16.9033 6.63159C17.0606 6.97065 17.1418 7.34005 17.1418 7.71384V15.4276Z" fill="#22AD01"/></svg>
            <span className="sidenav-features-item-label">Home</span>
          </a>
          <a className="sidenav-features-item" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon notifications" width="20" height="20" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.5 1.75C10.2198 1.75 6.75 5.21979 6.75 9.5V12.9142C6.75 13.5773 6.48661 14.2132 6.01777 14.682L4.43934 16.2607C3.48214 17.2178 4.16066 18.8571 5.5 18.8571H23.5C24.8393 18.8571 25.5179 17.2178 24.5607 16.2607L22.9822 14.682C22.5134 14.2132 22.25 13.5773 22.25 12.9142V9.5C22.25 5.21979 18.7802 1.75 14.5 1.75ZM9.25 9.5C9.25 6.6005 11.6005 4.25 14.5 4.25C17.3995 4.25 19.75 6.6005 19.75 9.5V12.9142C19.75 14.2403 20.2768 15.5123 21.2145 16.4499L21.2678 16.5035C21.1936 16.4393 21.1357 16.3571 21.1005 16.2607H7.89949C7.86427 16.3571 7.8064 16.4393 7.73223 16.5035L7.78553 16.4499C8.72322 15.5123 9.25 14.2403 9.25 12.9142V9.5Z" fill="currentColor"/><path d="M11.25 20.75C11.25 22.5449 12.7051 24 14.5 24C16.2949 24 17.75 22.5449 17.75 20.75H11.25Z" fill="currentColor"/></svg>
            <span className="sidenav-features-item-label">Notifications</span>
          </a>
          <a className="sidenav-features-item" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon company" width="20" height="20" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 12.088C6.05225 12.088 6.49995 12.5357 6.5 13.088V15.088C6.5 15.6403 6.05228 16.088 5.5 16.088C4.94772 16.088 4.5 15.6403 4.5 15.088V13.088C4.50005 12.5357 4.94775 12.088 5.5 12.088Z" fill="#22AD01"/><path d="M9.5 12.088C10.0523 12.088 10.5 12.5357 10.5 13.088V15.088C10.5 15.6403 10.0523 16.088 9.5 16.088C8.94772 16.088 8.5 15.6403 8.5 15.088V13.088C8.50005 12.5357 8.94775 12.088 9.5 12.088Z" fill="#22AD01"/><path d="M5.5 6.08797C6.05225 6.08797 6.49995 6.53573 6.5 7.08797V9.08797C6.5 9.64025 6.05228 10.088 5.5 10.088C4.94772 10.088 4.5 9.64025 4.5 9.08797V7.08797C4.50005 6.53573 4.94775 6.08797 5.5 6.08797Z" fill="#22AD01"/><path d="M9.5 6.08797C10.0523 6.08797 10.5 6.53573 10.5 7.08797V9.08797C10.5 9.64025 10.0523 10.088 9.5 10.088C8.94772 10.088 8.5 9.64025 8.5 9.08797V7.08797C8.50005 6.53573 8.94775 6.08797 9.5 6.08797Z" fill="#22AD01"/><path fillRule="evenodd" clipRule="evenodd" d="M9.95996 0.139729C12.5014 -0.54448 14.9997 1.37023 15 4.00203V7.1368L16.7842 7.49422C18.6537 7.86814 19.9998 9.50961 20 11.4161V16.4688C19.9999 18.6779 18.2091 20.4688 16 20.4688H13.1367C12.5184 20.8604 11.786 21.088 11 21.088H4C1.79086 21.088 4.83192e-08 19.2971 0 17.088V5.8868C0.000177254 4.07835 1.21368 2.49469 2.95996 2.02449L9.95996 0.139729ZM13 4.00203C12.9997 2.6864 11.751 1.72957 10.4805 2.07137L3.48047 3.95614C2.60737 4.1912 2.00018 4.98264 2 5.8868V17.088C2 18.1925 2.89543 19.088 4 19.088H11C12.1046 19.088 13 18.1925 13 17.088V4.00203ZM15 17.088C15 17.5733 14.9132 18.0384 14.7549 18.4688H16C17.1045 18.4688 17.9999 17.5733 18 16.4688V11.4161C17.9998 10.4631 17.3271 9.64223 16.3926 9.45516L15 9.17586V17.088Z" fill="#22AD01"/></svg>
            <span className="sidenav-features-item-label">Clients</span>
          </a>
          <a className="sidenav-features-item active" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon contact" width="20" height="20" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.6299 5.00488C14.6792 5.10682 16.3096 6.77116 16.3096 8.80859L16.3037 9.00391C16.2 11.0169 14.5057 12.6161 12.4307 12.6162H12.4023C10.2676 12.6092 8.54378 10.9046 8.55176 8.80859C8.55176 6.70549 10.2887 5 12.4307 5L12.6299 5.00488ZM12.4307 7.28027C11.5084 7.28027 10.832 8.00386 10.832 8.80859V8.81738C10.8291 9.61505 11.4954 10.3338 12.4092 10.3369H12.4307C13.3531 10.3368 14.0291 9.61376 14.0293 8.80859C14.0293 8.00392 13.3528 7.28038 12.4307 7.28027Z" fill="#22AD01"/><path fillRule="evenodd" clipRule="evenodd" d="M18.9287 0C21.1772 7.5932e-05 22.9998 1.83941 23 4.1084V16.8916C22.9998 19.1606 21.1772 20.9999 18.9287 21H12.5879C12.5585 21.0001 12.5292 21.001 12.5 21.001L12.4219 21H4.07129C1.82287 20.9999 0.000159335 19.1606 0 16.8916V4.1084C0.000159336 1.83941 1.82287 7.61931e-05 4.07129 0H18.9287ZM4.07129 2.28223C3.07208 2.2823 2.26188 3.10006 2.26172 4.1084V7H3.86035C4.48968 7.00019 4.99981 7.51032 5 8.13965C5 8.76914 4.48979 9.28008 3.86035 9.28027H2.26172V12H3.86035C4.48968 12.0002 4.99981 12.5103 5 13.1396C5 13.7691 4.48979 14.2801 3.86035 14.2803H2.26172V16.8916C2.26188 17.9 3.07208 18.7177 4.07129 18.7178H6.22266C6.10974 18.4556 6.03659 18.1644 6.01074 17.8408L6 17.5723C6 14.6462 9.65607 13.6671 12.5 13.667C15.359 13.667 19 14.646 19 17.5947L18.9893 17.8633C18.964 18.1783 18.8916 18.4615 18.7832 18.7178H18.9287C19.9279 18.7177 20.7381 17.9 20.7383 16.8916V4.1084C20.7381 3.10006 19.9279 2.2823 18.9287 2.28223H4.07129ZM12.5 15.9463C11.2807 15.9463 10.0281 16.1654 9.17188 16.5771C8.36365 16.9658 8.28027 17.2989 8.28027 17.5723C8.28035 17.7949 8.33302 17.8524 8.35938 17.8838C8.42045 17.9565 8.592 18.107 8.99805 18.2637C9.80201 18.5738 10.9719 18.7028 12.2461 18.7178H12.7539C14.0265 18.7033 15.1974 18.5788 16.0049 18.2715C16.4124 18.1163 16.5836 17.9671 16.6436 17.8965C16.6674 17.8683 16.7197 17.8149 16.7197 17.5947C16.7197 17.2975 16.625 16.9623 15.8291 16.5771C14.9782 16.1655 13.7284 15.9463 12.5 15.9463Z" fill="#22AD01"/></svg>
            <span className="sidenav-features-item-label">Contacts</span>
          </a>
        </div>
      </div>

      {/* Workspace section */}
      <div className="sidenav-link-section">
        <div className="sidenav-link-section-header">
          <span className="sidenav-link-section-header-label">Workspace</span>
        </div>
        <div className="sidenav-draggable-list">
          <a className="sidenav-features-item" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon deals" width="20" height="20" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.40835 0H16.5053C18.0256 0 19.4085 0.880056 20.0523 2.25729L22.0028 6.42995C22.9123 8.3756 22.9123 10.6244 22.0028 12.57L20.0523 16.7427C19.4085 18.1199 18.0256 19 16.5053 19H4.40835C2.74724 19 0.782501 18.1324 0.151362 16.219C-0.159865 15.2755 0.0914611 14.4203 0.177522 14.1274L1.29587 10.3166C1.45232 9.78342 1.45232 9.21656 1.29587 8.68342L0.177522 4.87256C0.0914605 4.5797 -0.159866 3.72447 0.151365 2.78095C0.782515 0.867566 2.74728 0 4.40835 0ZM4.40835 2.1749H5.64136L7.48734 8.36091C7.70934 9.10482 7.70934 9.89736 7.48734 10.6413L5.64201 16.8251H4.40835C3.34937 16.8251 2.46068 16.2771 2.2168 15.5377C2.13019 15.2752 2.19006 14.9932 2.26791 14.7279L3.38276 10.929C3.65656 9.99599 3.65656 9.00399 3.38276 8.071L2.26791 4.27203C2.19006 4.00674 2.13019 3.72481 2.2168 3.46225C2.46068 2.72292 3.34937 2.1749 4.40835 2.1749ZM9.57143 7.73899L7.91103 2.1749H11.6284L13.5363 8.56821C13.7179 9.17687 13.7179 9.82531 13.5363 10.434L11.6291 16.8251H7.91168L9.57143 11.2632C9.91451 10.1135 9.91451 8.88867 9.57143 7.73899ZM13.8987 16.8251H16.5053C17.1811 16.8251 17.7958 16.4339 18.082 15.8217L20.0326 11.649C20.6692 10.2871 20.6692 8.71292 20.0325 7.35096L18.082 3.1783C17.7958 2.5661 17.1811 2.1749 16.5053 2.1749H13.8981L15.6203 7.94629C15.9231 8.96072 15.9231 10.0415 15.6203 11.0559L13.8987 16.8251Z" fill="#22AD01"/></svg>
            <span className="sidenav-features-item-label">Deals</span>
          </a>
          <a className="sidenav-features-item" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon scheduling-icon" width="20" height="20" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.6176 0.75C9.30796 0.75 9.8676 1.30964 9.8676 2V2.85547H18.1489V2C18.1489 1.30964 18.7085 0.75 19.3989 0.75C20.0892 0.75 20.6489 1.30964 20.6489 2V2.89981C22.4255 3.06172 23.9892 3.67105 25.1656 4.79251C26.5671 6.12854 27.2565 8.03638 27.25 10.2981V22.4632C27.25 24.7248 26.5571 26.6343 25.1555 27.9725C23.7628 29.3023 21.8288 29.9165 19.6387 29.9165H8.36128C6.17082 29.9165 4.23508 29.2891 2.84234 27.9392C1.44338 26.5833 0.75 24.6515 0.75 22.3624V10.2962C0.75 8.03264 1.44721 6.12582 2.85107 4.7913C4.02968 3.6709 5.59338 3.06137 7.3676 2.89965V2C7.3676 1.30964 7.92724 0.75 8.6176 0.75ZM7.3676 5.41298C6.14122 5.56181 5.21747 5.99111 4.57352 6.60325C3.77564 7.36172 3.25 8.55025 3.25 10.2962V10.6226H24.75V10.2962L24.75 10.2923C24.7553 8.54543 24.2343 7.35861 23.4406 6.60204C22.8001 5.99144 21.8781 5.56211 20.6489 5.41312V6.38771C20.6489 7.07806 20.0892 7.63771 19.3989 7.63771C18.7085 7.63771 18.1489 7.07806 18.1489 6.38771V5.35547H9.8676V6.38771C9.8676 7.07806 9.30796 7.63771 8.6176 7.63771C7.92724 7.63771 7.3676 7.07806 7.3676 6.38771V5.41298ZM24.75 13.1226H3.25V22.3624C3.25 24.1457 3.77947 25.366 4.58226 26.144C5.39126 26.9281 6.63616 27.4165 8.36128 27.4165H19.6387C21.3765 27.4165 22.6232 26.9338 23.4291 26.1644C24.2262 25.4033 24.75 24.2111 24.75 22.4632V13.1226ZM6.83017 17.0796C6.83017 16.3893 7.38982 15.8296 8.08017 15.8296H8.09253C8.78288 15.8296 9.34253 16.3893 9.34253 17.0796C9.34253 17.77 8.78288 18.3296 8.09253 18.3296H8.08017C7.38982 18.3296 6.83017 17.77 6.83017 17.0796ZM12.752 17.0796C12.752 16.3893 13.3117 15.8296 14.002 15.8296H14.0144C14.7048 15.8296 15.2644 16.3893 15.2644 17.0796C15.2644 17.77 14.7048 18.3296 14.0144 18.3296H14.002C13.3117 18.3296 12.752 17.77 12.752 17.0796ZM18.6739 17.0797C18.6739 16.3894 19.2336 15.8297 19.9239 15.8297H19.9363C20.6266 15.8297 21.1863 16.3894 21.1863 17.0797C21.1863 17.7701 20.6266 18.3297 19.9363 18.3297H19.9239C19.2336 18.3297 18.6739 17.7701 18.6739 17.0797ZM6.83017 22.2613C6.83017 21.5709 7.38982 21.0113 8.08017 21.0113H8.09253C8.78288 21.0113 9.34253 21.5709 9.34253 22.2613C9.34253 22.9516 8.78288 23.5113 8.09253 23.5113H8.08017C7.38982 23.5113 6.83017 22.9516 6.83017 22.2613ZM12.752 22.2613C12.752 21.5709 13.3117 21.0113 14.002 21.0113H14.0144C14.7048 21.0113 15.2644 21.5709 15.2644 22.2613C15.2644 22.9516 14.7048 23.5113 14.0144 23.5113H14.002C13.3117 23.5113 12.752 22.9516 12.752 22.2613ZM18.6739 22.2613C18.6739 21.5709 19.2336 21.0113 19.9239 21.0113H19.9363C20.6266 21.0113 21.1863 21.5709 21.1863 22.2613C21.1863 22.9516 20.6266 23.5113 19.9363 23.5113H19.9239C19.2336 23.5113 18.6739 22.9516 18.6739 22.2613Z" fill="#4C4D5F"/></svg>
            <span className="sidenav-features-item-label">Scheduling</span>
          </a>
          <a className="sidenav-features-item" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon tasks" width="20" height="20" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.87565 3.10429C4.28643 1.59075 6.29102 0.75 8.64189 0.75H20.3568C22.7129 0.75 24.7184 1.59021 26.1287 3.10476C27.5296 4.60924 28.25 6.67765 28.25 8.98108V20.0189C28.25 22.3224 27.5296 24.3908 26.1284 25.8953C24.718 27.4099 22.7121 28.25 20.3554 28.25H8.64189C6.28575 28.25 4.28048 27.4098 2.87053 25.8951C1.47 24.3906 0.75 22.3222 0.75 20.0189V8.98108C0.75 6.67626 1.47397 4.60808 2.87565 3.10429ZM4.70441 4.80888C3.80576 5.773 3.25 7.19536 3.25 8.98108V20.0189C3.25 21.8062 3.80365 23.2284 4.70042 24.1917C5.58777 25.145 6.90344 25.75 8.64189 25.75H20.3554C22.0947 25.75 23.4111 25.1449 24.2989 24.1915C25.1961 23.2281 25.75 21.806 25.75 20.0189V8.98108C25.75 7.19397 25.1961 5.77184 24.299 4.80841C23.4113 3.85506 22.0952 3.25 20.3568 3.25H8.64189C6.91033 3.25 5.59398 3.85452 4.70441 4.80888ZM20.193 10.4091C20.6812 10.8972 20.6812 11.6887 20.193 12.1769L13.7795 18.5904C13.2914 19.0784 12.5001 19.0785 12.0119 18.5906L8.8038 15.3838C8.31554 14.8957 8.31538 14.1043 8.80343 13.616C9.29148 13.1278 10.0829 13.1276 10.5712 13.6157L12.8954 15.9389L18.4252 10.4091C18.9134 9.92093 19.7048 9.92093 20.193 10.4091Z" fill="#22AD01"/></svg>
            <span className="sidenav-features-item-label">Tasks</span>
          </a>
          <a className="sidenav-features-item" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon client-portal" width="20" height="20" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.8501 17.9996C9.8501 17.3645 10.365 16.8496 11.0001 16.8496H18.0001C18.6352 16.8496 19.1501 17.3645 19.1501 17.9996C19.1501 18.6347 18.6352 19.1496 18.0001 19.1496L11.0001 19.1496C10.365 19.1496 9.8501 18.6347 9.8501 17.9996Z" fill="#22AD01"/><path fillRule="evenodd" clipRule="evenodd" d="M6.0001 9.99961C6.0001 8.34276 7.34324 6.99961 9.0001 6.99961H20.0001C21.657 6.99961 23.0001 8.34276 23.0001 9.99961V10.9996C23.0001 12.6565 21.657 13.9996 20.0001 13.9996H9.0001C7.34324 13.9996 6.0001 12.6565 6.0001 10.9996V9.99961ZM9.0001 9.29961H20.0001C20.3867 9.29961 20.7001 9.61301 20.7001 9.99961V10.9996C20.7001 11.3862 20.3867 11.6996 20.0001 11.6996H9.0001C8.6135 11.6996 8.3001 11.3862 8.3001 10.9996V9.99961C8.3001 9.61301 8.6135 9.29961 9.0001 9.29961Z" fill="#22AD01"/><path fillRule="evenodd" clipRule="evenodd" d="M0.850098 6.99961C0.850098 3.60306 3.60355 0.849609 7.0001 0.849609H22.0001C25.3966 0.849609 28.1501 3.60306 28.1501 6.99961V18.9996C28.1501 22.3962 25.3966 25.1496 22.0001 25.1496H7.0001C3.60355 25.1496 0.850098 22.3962 0.850098 18.9996V6.99961ZM7.0001 3.14961C4.8738 3.14961 3.1501 4.87331 3.1501 6.99961V18.9996C3.1501 21.1259 4.8738 22.8496 7.0001 22.8496H22.0001C24.1264 22.8496 25.8501 21.1259 25.8501 18.9996V6.99961C25.8501 4.87331 24.1264 3.14961 22.0001 3.14961H7.0001Z" fill="#22AD01"/></svg>
            <span className="sidenav-features-item-label">Client Portal</span>
          </a>
          <a className="sidenav-features-item" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon timetracking" width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7764 9.16211C15.7764 8.47175 15.2167 7.91211 14.5264 7.91211C13.836 7.91211 13.2764 8.47175 13.2764 9.16211V15.9741C13.2764 16.4143 13.5079 16.8221 13.886 17.0476L19.1843 20.2084C19.7772 20.562 20.5446 20.3681 20.8982 19.7753C21.2519 19.1824 21.058 18.4151 20.4651 18.0614L15.7764 15.2643V9.16211Z" fill="#22AD01"/><path fillRule="evenodd" clipRule="evenodd" d="M15 0.75C7.12943 0.75 0.75 7.12943 0.75 15C0.75 22.8706 7.12943 29.25 15 29.25C22.8706 29.25 29.25 22.8706 29.25 15C29.25 7.12943 22.8706 0.75 15 0.75ZM3.25 15C3.25 8.51014 8.51014 3.25 15 3.25C21.4899 3.25 26.75 8.51014 26.75 15C26.75 21.4899 21.4899 26.75 15 26.75C8.51014 26.75 3.25 21.4899 3.25 15Z" fill="#22AD01"/></svg>
            <span className="sidenav-features-item-label">Time Tracking</span>
          </a>
          <a className="sidenav-features-item" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon meetings" width="20" height="20" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.5 3.25C2.70507 3.25 1.25 4.70507 1.25 6.5V18.5C1.25 20.2949 2.70507 21.75 4.5 21.75H16.5C18.2949 21.75 19.75 20.2949 19.75 18.5V16.5L24.1459 19.5973C24.9162 20.14 26 19.5853 26 18.6459V6.35414C26 5.41472 24.9162 4.86001 24.1459 5.40271L19.75 8.5V6.5C19.75 4.70507 18.2949 3.25 16.5 3.25H4.5ZM19.75 11.5V13.5L23.5 16.1541V8.8459L19.75 11.5ZM4.5 5.75C4.08579 5.75 3.75 6.08579 3.75 6.5V18.5C3.75 18.9142 4.08579 19.25 4.5 19.25H16.5C16.9142 19.25 17.25 18.9142 17.25 18.5V6.5C17.25 6.08579 16.9142 5.75 16.5 5.75H4.5Z" fill="#22AD01"/></svg>
            <span className="sidenav-features-item-label">Meetings</span>
          </a>
          <a className="sidenav-features-item" href="#">
            <div className="sidenav-features-item-bg"></div>
            <svg className="sidenav-features-item-icon more" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="7" r="1.25" fill="currentColor"/><circle cx="7" cy="7" r="1.25" fill="currentColor"/><circle cx="11" cy="7" r="1.25" fill="currentColor"/></svg>
            <span className="sidenav-features-item-label">More</span>
          </a>
        </div>
      </div>

      {/* Bottom links */}
      <div className="sidenav-navigation-bottom-links">
        <a className="sidenav-features-item" href="#">
          <div className="sidenav-features-item-bg"></div>
          <svg className="sidenav-features-item-icon reports" width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.875 1C11.4963 1 12 1.50368 12 2.125C12 2.74632 11.4963 3.25 10.875 3.25H5C3.48122 3.25 2.25 4.48122 2.25 6V18C2.25 19.5188 3.48122 20.75 5 20.75H17C18.5188 20.75 19.75 19.5188 19.75 18V12.125C19.75 11.5037 20.2537 11 20.875 11C21.4963 11 22 11.5037 22 12.125V18L21.9932 18.2568C21.8638 20.8138 19.8138 22.8638 17.2568 22.9932L17 23H5C2.32472 23 0.140529 20.8989 0.00683594 18.2568L0 18V6C2.57711e-07 3.23858 2.23858 1 5 1H10.875Z" fill="black"/><path d="M13.9395 9.62402C14.1472 9.03861 14.7905 8.7319 15.376 8.93945C15.9614 9.14722 16.2681 9.79054 16.0605 10.376L13.5205 14.7148C13.0857 15.94 11.553 16.3426 10.5723 15.4893L8.30957 13.5215L7.03125 16.4502C6.78257 17.0195 6.11913 17.2798 5.5498 17.0312C4.98051 16.7826 4.72021 16.1191 4.96875 15.5498L6.46973 12.1133C6.93693 11.0438 8.25215 10.6872 9.18848 11.3203L9.37012 11.4609L11.5996 13.4004L13.9395 9.62402Z" fill="black"/><path fillRule="evenodd" clipRule="evenodd" d="M19 0C21.2091 0 23 1.79086 23 4C23 6.20914 21.2091 8 19 8C16.7909 8 15 6.20914 15 4C15 1.79086 16.7909 0 19 0ZM19 2.25C18.0335 2.25 17.25 3.0335 17.25 4C17.25 4.9665 18.0335 5.75 19 5.75C19.9665 5.75 20.75 4.9665 20.75 4C20.75 3.0335 19.9665 2.25 19 2.25Z" fill="black"/></svg>
          <span className="sidenav-features-item-label">Reports</span>
        </a>
        <a className="sidenav-features-item" href="#">
          <div className="sidenav-features-item-bg"></div>
          <svg className="sidenav-features-item-icon automation" width="20" height="20" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.2286 0.025156C11.5215 -0.0290048 11.823 0.00477069 12.0948 0.121836L12.2091 0.177499L12.3185 0.241953C12.5311 0.380068 12.7049 0.57002 12.8243 0.79371L12.88 0.907968L12.9249 1.02711C13.0181 1.30766 13.0262 1.61037 12.9474 1.89723C12.9438 1.91016 12.9407 1.92351 12.9366 1.93629L11.0167 7.95582L11.0001 8.0027H18.003C18.3806 8.00196 18.7506 8.10767 19.0704 8.30837C19.391 8.50956 19.6473 8.79806 19.8107 9.13941C19.974 9.48078 20.0376 9.86127 19.9932 10.2371C19.9488 10.6129 19.7981 10.9685 19.5597 11.2625C19.5411 11.2854 19.5216 11.3077 19.5011 11.3289L9.60068 21.5291C9.38196 21.7629 9.09428 21.9218 8.77841 21.9803C8.44386 22.0421 8.09796 21.9884 7.79795 21.8279C7.49795 21.6674 7.26129 21.4091 7.12704 21.0965C6.99296 20.7839 6.96947 20.4351 7.05966 20.1072L7.0704 20.0681L8.99033 14.0486L9.00693 14.0027H2.00303C1.6259 14.0033 1.25607 13.8966 0.936614 13.6961C0.616302 13.4949 0.35971 13.2071 0.196378 12.866C0.0330114 12.5246 -0.030651 12.1432 0.0137619 11.7674C0.0582214 11.3916 0.208983 11.0358 0.447356 10.742C0.465918 10.7191 0.485444 10.6967 0.50595 10.6755L10.4063 0.476328C10.6251 0.242284 10.9126 0.0836089 11.2286 0.025156ZM2.00595 12.0027H9.00302C9.32558 12.0021 9.64359 12.0794 9.92978 12.2283C10.2167 12.3776 10.4637 12.5937 10.6485 12.8591C10.8334 13.1246 10.9509 13.4317 10.9913 13.7527C11.0296 14.0573 10.9939 14.3653 10.8936 14.655L10.8966 14.656L9.62997 18.6267L18.0011 10.0027H11.003C10.6808 10.0031 10.3631 9.92579 10.0772 9.77711C9.79023 9.62783 9.54335 9.41076 9.35849 9.14528C9.17375 8.8799 9.05618 8.57349 9.01572 8.2527C8.97729 7.94768 9.01191 7.63848 9.1124 7.3484H9.11045L10.3761 3.37673L2.00595 12.0027Z" fill="#22AD01"/></svg>
          <span className="sidenav-features-item-label">Automations</span>
        </a>
        <a className="sidenav-features-item" href="#">
          <div className="sidenav-features-item-bg"></div>
          <svg className="sidenav-features-item-icon support" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.09369 1.82245C5.96852 0.483119 8.25653 -0.151953 10.5533 0.0307844C12.8504 0.213768 15.0103 1.20298 16.6497 2.82245C18.2887 4.44177 19.3032 6.58797 19.5143 8.88235C19.7252 11.1769 19.1197 13.4729 17.8033 15.3641C16.4869 17.2553 14.544 18.6207 12.319 19.2196C10.111 19.8137 7.76469 19.6141 5.68875 18.6584C5.54413 18.6059 5.38847 18.5923 5.23692 18.618L2.25516 19.4904C2.24823 19.4924 2.24129 19.4951 2.23432 19.4969C1.94173 19.5745 1.63319 19.5753 1.33979 19.5008C1.04666 19.4263 0.777135 19.2776 0.557237 19.0699C0.337335 18.8619 0.172983 18.6007 0.0819765 18.312C-0.008834 18.0236 -0.0244568 17.7164 0.0364036 17.4201L0.0611432 17.3251L0.988227 14.4605C1.01977 14.2972 1.00636 14.1289 0.94656 13.9735C-0.0339283 11.9097 -0.261112 9.567 0.305935 7.3524C0.877561 5.12039 2.219 3.16189 4.09369 1.82245ZM10.4127 1.80292C8.53356 1.65336 6.66149 2.17205 5.12755 3.26776C3.5934 4.36373 2.495 5.96733 2.02729 7.7938C1.58901 9.50577 1.73208 11.311 2.42572 12.9292L2.57156 13.2508L2.59629 13.3094C2.79223 13.8039 2.83685 14.346 2.7226 14.8655C2.71651 14.8931 2.70788 14.9205 2.69916 14.9475L1.7838 17.7756L4.79031 16.8967C4.8154 16.8893 4.84151 16.8835 4.86713 16.8784C5.29587 16.7935 5.7382 16.8141 6.15489 16.9396L6.33197 17.0008L6.39187 17.0256C8.10019 17.8233 10.0361 17.9921 11.8567 17.5021C13.6772 17.0121 15.2665 15.8957 16.3437 14.3485C17.4208 12.8011 17.9161 10.9225 17.7435 9.04511C17.5707 7.16785 16.7408 5.41169 15.3997 4.08677C14.0584 2.76201 12.2919 1.95265 10.4127 1.80292ZM9.7864 13.3329C10.2773 13.3329 10.6757 13.7313 10.6757 14.2221C10.6757 14.7131 10.2773 15.1115 9.7864 15.1115H9.77859C9.28769 15.1115 8.88929 14.7131 8.88927 14.2221C8.88927 13.7313 9.28767 13.3329 9.77859 13.3329H9.7864ZM7.90229 4.93052C8.62605 4.50525 9.47725 4.34988 10.3046 4.49172C11.1319 4.63373 11.8825 5.06447 12.4231 5.70656C12.9635 6.34864 13.2601 7.16165 13.2591 8.00084L13.2473 8.24953C13.1339 9.47128 12.2052 10.2902 11.5299 10.7404C11.1431 10.9983 10.7622 11.1874 10.4817 11.312C10.3402 11.3749 10.22 11.4225 10.1341 11.4553C10.0914 11.4715 10.0565 11.484 10.0312 11.493C10.0186 11.4975 10.0077 11.5021 9.99995 11.5047C9.99636 11.506 9.99332 11.5078 9.99083 11.5087H9.98692L9.98563 11.5099C9.52004 11.6649 9.01452 11.413 8.85932 10.9475C8.70457 10.4824 8.95609 9.97964 9.42052 9.82375C9.42283 9.82296 9.42876 9.82069 9.43484 9.81855C9.44843 9.81372 9.47165 9.80637 9.50125 9.79511C9.56113 9.77229 9.65076 9.73647 9.75905 9.68833C9.97844 9.59084 10.2648 9.44751 10.5442 9.26125C11.1567 8.85292 11.4812 8.41755 11.4817 8.00084V7.99823C11.4823 7.57859 11.334 7.17217 11.0637 6.85109C10.7934 6.52991 10.4177 6.314 10.0039 6.24303C9.59013 6.17212 9.16391 6.2504 8.80203 6.46308C8.44037 6.67576 8.16529 7.01003 8.02599 7.40579C7.86301 7.86855 7.35607 8.11263 6.89317 7.95005C6.43015 7.78716 6.18612 7.27899 6.34891 6.81595C6.62756 6.02388 7.1784 5.35596 7.90229 4.93052Z" fill="#22AD01"/></svg>
          <span className="sidenav-features-item-label">Support</span>
        </a>
      </div>
    </nav>
  </div>

  {/* ========== MAIN CONTENT AREA ========== */}
  <div className="page-content page-content-with-header">

    {/* Top Navigation Bar */}
    <nav id="navigation">
      <div className="navigation-breadcumb">
        <a href="#" className="navigation-breadcumb-item navigation-breadcumb-item--link">
          <span className="overflow-ellipsis">Contacts</span>
        </a>
        <div className="navigation-breadcumb-separator">/</div>
        <div className="navigation-breadcumb-item">
          <span className="overflow-ellipsis">Michael Fawler</span>
        </div>
      </div>
      <div className="navigation-right">
        <div style={{display: 'flex', alignItems: 'center', height: '60px', paddingRight: '20px', gap: '4px'}}>
          {/* Video/Recording button */}
          <button className="navigation-action-cta" style={{width: '36px', height: '36px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/></svg>
          </button>
          {/* Search button */}
          <button className="navigation-action-cta" style={{width: '36px', height: '36px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          {/* Bell with notification badge */}
          <button className="navigation-action-cta" style={{width: '36px', height: '36px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', color: 'var(--text-muted)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span style={{position: 'absolute', top: '4px', right: '2px', background: '#eb5757', color: 'white', fontSize: '8px', fontWeight: '700', borderRadius: '8px', padding: '1px 4px', lineHeight: '1.4', minWidth: '16px', textAlign: 'center'}}>9+</span>
          </button>
          {/* Plus / Add button */}
          <button className="navigation-action-cta" style={{width: '36px', height: '36px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </button>
        </div>
      </div>
    </nav>
  </div>

  {/* ========== CONTACT PAGE ========== */}
  <div className="contact-page-body">

      {/* Profile Header */}
      <div className="top-header-section company mb0 contact-header-with-nav" style={{borderBottom: 'none', marginBottom: '0', paddingBottom: '0'}}>
        <div className="wrapper-full-width">
          <div className="top-header-content">
            <div className="top-header-content-in">
              <div className="company-details-inner-wrapper">
                <div>
                  <div className="company-details-column1">
                    <div className="user-avatar avatar-lg" style={{backgroundColor: '#4c525a', backgroundImage: 'url(\'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png\')', backgroundSize: 'cover', borderRadius: '50%'}}></div>
                  </div>
                  <h2 className="company-details-name">Michael Fawler</h2>
                  <div className="company-details-info">
                    Senior Manager of Consulting at
                    <a href="#" className="company-details-info-link" style={{color: 'var(--color-primary)'}}>
                      <svg className="company-details-info-icon" width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11.1805 8.6079H11.1804C11.1717 10.9139 13.0318 12.7886 15.3358 12.7983H15.3804C17.7 12.7983 19.5803 10.919 19.5803 8.59839C19.5803 6.27912 17.6996 4.39844 15.3804 4.39844C13.0611 4.39844 11.1805 6.27912 11.1805 8.59839V8.6079ZM13.8045 15.1177C10.8557 14.417 8.66842 11.7605 8.68045 8.59839C8.68045 4.89841 11.6804 1.89844 15.3804 1.89844C19.0803 1.89844 22.0803 4.89841 22.0803 8.59839C22.0803 11.7484 19.9079 14.389 16.9804 15.1061C16.5051 15.2226 16.0098 15.2883 15.5007 15.2973C15.4607 15.298 15.4206 15.2983 15.3804 15.2983H15.3313C14.8057 15.2966 14.2946 15.2341 13.8045 15.1177ZM17.1874 17.621C16.6154 17.5866 16.0497 17.5703 15.5007 17.5703C15.4607 17.5703 15.4206 17.5704 15.3804 17.5706C15.364 17.5706 15.3476 17.5707 15.3313 17.5708C15.3287 17.5708 15.3262 17.5709 15.3237 17.5709C14.7674 17.5744 14.1944 17.5949 13.6159 17.634C9.11356 17.9387 4.27197 19.3773 4.27197 22.8239C4.27197 26.7873 10.5621 28.1007 15.5007 28.1007C20.4133 28.1007 26.7279 26.8173 26.7279 22.8542C26.7279 19.3283 21.7598 17.8959 17.1874 17.621ZM8.92088 21.0621C6.96796 21.7935 6.77197 22.5093 6.77197 22.8239C6.77197 23.1636 6.97919 23.8806 8.91458 24.6087C10.7182 25.2871 13.1949 25.6007 15.5007 25.6007C17.7977 25.6007 20.2762 25.2938 22.0844 24.6207C24.0283 23.897 24.2279 23.1842 24.2279 22.8542C24.2279 22.5107 24.0182 21.7927 22.0847 21.0641C20.2818 20.3846 17.806 20.0703 15.5007 20.0703C13.2098 20.0703 10.7308 20.3843 8.92088 21.0621Z" fill="#22AD01"></path></svg>
                      Adobe
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt20">
                <div className="dropdown-wrap company-details-dropdown-menu">
                  <a className="btn btn-default btn-sm btn-dropdown-dots">
                    <svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959Z" fill="#0f1010"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Tabs — outside wrapper-full-width so the bottom border spans full width */}
        <div className="subnavigation mt20">
          <div className="subnavigation-items pl40">
            <a className="subnavigation-item active" id="tab-btn-activity" onClick={() => (window as any).switchTab('activity')}>Activity</a>
            <a className="subnavigation-item" id="tab-btn-notes" onClick={() => (window as any).switchTab('notes')}>Notes</a>
            <a className="subnavigation-item" id="tab-btn-meetings" onClick={() => (window as any).switchTab('meetings')}>Meetings</a>
            <a className="subnavigation-item" id="tab-btn-emails" onClick={() => (window as any).switchTab('emails')}>Emails</a>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="contact-content-area">

        {/* ====== MAIN CONTENT ====== */}
        <div className="contact-main-content">

          {/* ── ACTIVITY TAB ── */}
          <div id="tab-activity" className="tab-panel active">
            <div className="tab-section-title-row">
              <span className="tab-section-title">Activity</span>
              <div className="add-btn-wrap">
                <div className="dashboard-chart-options showing-xs" style={{position: 'relative'}}>
                  <a className="dashboard-chart-option-add-icon" onClick={() => (window as any).toggleAddMenu()} title="Add" style={{cursor: 'pointer'}}>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.4062 8.83333H11.6667V2.09375C11.6667 1.21354 10.9219 0.5 10 0.5C9.07812 0.5 8.33333 1.21354 8.33333 2.09375V8.83333H1.59375C0.713542 8.83333 0 9.57812 0 10.5C0 11.4219 0.713542 12.1667 1.59375 12.1667H8.33333V18.9062C8.33333 19.7865 9.07812 20.5 10 20.5C10.9219 20.5 11.6667 19.7865 11.6667 18.9062V12.1667H18.4062C19.2865 12.1667 20 11.4219 20 10.5C20 9.57812 19.2865 8.83333 18.4062 8.83333Z" fill="#22AD01"></path></svg>
                  </a>
                  <div className="add-dropdown" id="add-activity-menu">
                    <div className="field-popup-menu popup-menu-160" style={{position: 'relative', boxShadow: 'var(--box-shadow-medium)'}}>
                      <a className="field-popup-menu-list-item" onClick={() => (window as any).showActivityNoteComposer()}>
                        Add Note
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="activity-note-composer-wrap" style={{display: 'none', marginBottom: '20px'}}></div>

            <div className="activity-feed">

              {/* Note: Tom Bradley */}
              <div className="activity-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div>
                  <div className="activity-item-line"></div>
                </div>
                <div className="activity-item-body">
                  <div className="activity-meta"><strong>Tom Bradley</strong> added a note &middot; Jan 22, 6:15 PM</div>
                  <div className="activity-text">Michael shared confidentially that TechStart Labs is exploring a seed fundraise in Q3. Wants us to complete the market positioning analysis before they start investor conversations.</div>
                </div>
                <div className="note-actions" style={{flexShrink: '0', position: 'relative'}}>
                  <button className="note-menu-btn" onClick={(e) => (window as any).toggleNoteMenu(e.currentTarget)}>···</button>
                  <div className="note-dropdown" style={{display: 'none'}}>
                    <div className="field-popup-menu popup-menu-120" style={{position: 'relative', boxShadow: 'var(--box-shadow-medium)'}}>
                      <a className="field-popup-menu-list-item" onClick={(e) => (window as any).editNote(e.currentTarget)}>Edit</a>
                      <a className="field-popup-menu-list-item field-popup-menu-list-item--danger" onClick={(e) => (window as any).deleteNote(e.currentTarget)}>Delete</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deal assigned: Tom Bradley */}
              <div className="activity-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div>
                  <div className="activity-item-line"></div>
                </div>
                <div className="activity-item-body">
                  <div className="activity-meta"><strong>Tom Bradley</strong> assigned deal <strong>Market Entry Strategy</strong> ($15,000) to Michael Fawler &middot; Jan 21, 11:13 AM</div>
                  <div className="doc-card">
                    <div className="doc-card-icon">
                      <svg width="18" height="15" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.40835 0H16.5053C18.0256 0 19.4085 0.880056 20.0523 2.25729L22.0028 6.42995C22.9123 8.3756 22.9123 10.6244 22.0028 12.57L20.0523 16.7427C19.4085 18.1199 18.0256 19 16.5053 19H4.40835C2.74724 19 0.782501 18.1324 0.151362 16.219C-0.159865 15.2755 0.0914611 14.4203 0.177522 14.1274L1.29587 10.3166C1.45232 9.78342 1.45232 9.21656 1.29587 8.68342L0.177522 4.87256C0.0914605 4.5797 -0.159866 3.72447 0.151365 2.78095C0.782515 0.867566 2.74728 0 4.40835 0ZM4.40835 2.1749H5.64136L7.48734 8.36091C7.70934 9.10482 7.70934 9.89736 7.48734 10.6413L5.64201 16.8251H4.40835C3.34937 16.8251 2.46068 16.2771 2.2168 15.5377C2.13019 15.2752 2.19006 14.9932 2.26791 14.7279L3.38276 10.929C3.65656 9.99599 3.65656 9.00399 3.38276 8.071L2.26791 4.27203C2.19006 4.00674 2.13019 3.72481 2.2168 3.46225C2.46068 2.72292 3.34937 2.1749 4.40835 2.1749ZM9.57143 7.73899L7.91103 2.1749H11.6284L13.5363 8.56821C13.7179 9.17687 13.7179 9.82531 13.5363 10.434L11.6291 16.8251H7.91168L9.57143 11.2632C9.91451 10.1135 9.91451 8.88867 9.57143 7.73899ZM13.8987 16.8251H16.5053C17.1811 16.8251 17.7958 16.4339 18.082 15.8217L20.0326 11.649C20.6692 10.2871 20.6692 8.71292 20.0325 7.35096L18.082 3.1783C17.7958 2.5661 17.1811 2.1749 16.5053 2.1749H13.8981L15.6203 7.94629C15.9231 8.96072 15.9231 10.0415 15.6203 11.0559L13.8987 16.8251Z" fill="#22AD01"/></svg>
                    </div>
                    <div className="doc-card-title">Market Entry Strategy</div>
                  </div>
                </div>
              </div>

              {/* Meeting completed: Strategic Planning Offsite */}
              <div className="activity-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=CT&size=250&background=4c525a&color=ffffff&format=png\')'}}></div>
                  <div className="activity-item-line"></div>
                </div>
                <div className="activity-item-body">
                  <div className="activity-meta"><strong>Chris Taylor</strong> completed a meeting with Michael Fawler &middot; Jan 20, 9:00 AM</div>
                  <div className="meeting-card">
                    <div className="meeting-card-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#22AD01" strokeWidth="1.5"><rect x="1" y="3" width="10" height="10" rx="1.5"/><path d="M11 7l4-2v6l-4-2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="meeting-card-title">Strategic Planning Offsite</div>
                  </div>
                </div>
              </div>

              {/* Note: Tom Bradley Jan 14 */}
              <div className="activity-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div>
                  <div className="activity-item-line"></div>
                </div>
                <div className="activity-item-body">
                  <div className="activity-meta"><strong>Tom Bradley</strong> added a note &middot; Jan 14, 2:45 PM</div>
                  <div className="activity-text">Competitive landscape draft reviewed. Michael thinks our TAM estimates for enterprise are conservative—wants us to push 15-20% higher based on their internal data.</div>
                </div>
                <div className="note-actions" style={{flexShrink: '0', position: 'relative'}}>
                  <button className="note-menu-btn" onClick={(e) => (window as any).toggleNoteMenu(e.currentTarget)}>···</button>
                  <div className="note-dropdown" style={{display: 'none'}}>
                    <div className="field-popup-menu popup-menu-120" style={{position: 'relative', boxShadow: 'var(--box-shadow-medium)'}}>
                      <a className="field-popup-menu-list-item" onClick={(e) => (window as any).editNote(e.currentTarget)}>Edit</a>
                      <a className="field-popup-menu-list-item field-popup-menu-list-item--danger" onClick={(e) => (window as any).deleteNote(e.currentTarget)}>Delete</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meeting completed: Product Demo */}
              <div className="activity-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=CT&size=250&background=4c525a&color=ffffff&format=png\')'}}></div>
                  <div className="activity-item-line"></div>
                </div>
                <div className="activity-item-body">
                  <div className="activity-meta"><strong>Chris Taylor</strong> completed a meeting with Michael Fawler &middot; Jan 13, 2026 4:00 PM</div>
                  <div className="meeting-card">
                    <div className="meeting-card-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#22AD01" strokeWidth="1.5"><rect x="1" y="3" width="10" height="10" rx="1.5"/><path d="M11 7l4-2v6l-4-2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="meeting-card-title">Product Demo – Enterprise Plan</div>
                  </div>
                </div>
              </div>

              {/* Proposal sent: Tom Bradley */}
              <div className="activity-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div>
                  <div className="activity-item-line"></div>
                </div>
                <div className="activity-item-body">
                  <div className="activity-meta"><strong>Tom Bradley</strong> sent the <a>proposal</a> to michael.fawler@techstart.co &middot; Jan 24, 5:30 PM</div>
                  <div className="doc-card">
                    <div className="doc-card-icon">
                      <svg width="16" height="16" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M20.7278 2.70149C20.8079 2.43098 20.5585 2.19961 20.3116 2.27197L2.49928 7.48831C2.22156 7.56953 2.16281 7.95246 2.41618 8.11111C2.41622 8.11114 2.41626 8.11117 2.4163 8.11119L9.15335 12.325L15.1148 6.29982C15.5528 5.85721 16.2666 5.85342 16.7092 6.29135C17.1518 6.72928 17.1556 7.44309 16.7177 7.8857L10.7425 13.9246L14.8482 20.5843C14.8483 20.5844 14.8483 20.5845 14.8484 20.5846C14.8484 20.5846 14.8484 20.5847 14.8485 20.5847C15.0012 20.8315 15.3734 20.787 15.4584 20.5003L20.7278 2.70155L20.7278 2.70149ZM8.49211 14.5709L12.9294 21.7684C14.1091 23.6802 16.9832 23.2895 17.6202 21.1413L22.8898 3.34168C22.8898 3.34166 22.8898 3.34165 22.8898 3.34163C23.4711 1.37842 21.6572 -0.471877 19.6776 0.108136C19.6775 0.10816 19.6775 0.108184 19.6774 0.108207L1.8664 5.32417M8.49211 14.5709L1.22051 10.0228L1.22038 10.0227C-0.67572 8.83641 -0.287437 5.95438 1.86599 5.32429" fill="#22AD01"/></svg>
                    </div>
                    <div className="doc-card-title">Market Entry Strategy – Enterprise Segment</div>
                  </div>
                </div>
              </div>

              {/* Note: Chris Taylor */}
              <div className="activity-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=CT&size=250&background=4c525a&color=ffffff&format=png\')'}}></div>
                  <div className="activity-item-line"></div>
                </div>
                <div className="activity-item-body">
                  <div className="activity-meta"><strong>Chris Taylor</strong> added a note &middot; Jan 03, 11:00 AM</div>
                  <div className="activity-text">Board deck and strategic priorities shared under NDA. Market positioning analysis scope confirmed. Target completion: mid-February.</div>
                </div>
                <div className="note-actions" style={{flexShrink: '0', position: 'relative'}}>
                  <button className="note-menu-btn" onClick={(e) => (window as any).toggleNoteMenu(e.currentTarget)}>···</button>
                  <div className="note-dropdown" style={{display: 'none'}}>
                    <div className="field-popup-menu popup-menu-120" style={{position: 'relative', boxShadow: 'var(--box-shadow-medium)'}}>
                      <a className="field-popup-menu-list-item" onClick={(e) => (window as any).editNote(e.currentTarget)}>Edit</a>
                      <a className="field-popup-menu-list-item field-popup-menu-list-item--danger" onClick={(e) => (window as any).deleteNote(e.currentTarget)}>Delete</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contract signed: Michael Fawler */}
              <div className="activity-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png\')'}}></div>
                  <div className="activity-item-line"></div>
                </div>
                <div className="activity-item-body">
                  <div className="activity-meta"><strong>Michael Fawler</strong> signed the <a>contract</a> &middot; Jan 15, 1:20 PM</div>
                </div>
              </div>

            </div>
          </div>

          {/* ── NOTES TAB ── */}
          <div id="tab-notes" className="tab-panel">
            <div className="tab-section-title-row">
              <span className="tab-section-title">Notes</span>
            </div>

            <div id="note-add-area" style={{marginBottom: '30px'}}>
              <a className="contact-note-toggle" id="note-add-toggle" onClick={() => (window as any).showNoteComposer()}><div className="contact-note-toggle-icon"><svg className="" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.4062 8.83333H11.6667V2.09375C11.6667 1.21354 10.9219 0.5 10 0.5C9.07812 0.5 8.33333 1.21354 8.33333 2.09375V8.83333H1.59375C0.713542 8.83333 0 9.57812 0 10.5C0 11.4219 0.713542 12.1667 1.59375 12.1667H8.33333V18.9062C8.33333 19.7865 9.07812 20.5 10 20.5C10.9219 20.5 11.6667 19.7865 11.6667 18.9062V12.1667H18.4062C19.2865 12.1667 20 11.4219 20 10.5C20 9.57812 19.2865 8.83333 18.4062 8.83333V8.83333Z" fill="currentColor"></path></svg></div>Add Note</a>
              <div id="note-composer" style={{display: 'none'}}></div>
            </div>

            <div>

              {/* Note 1: Lucas Did */}
              <div className="note-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div>
                </div>
                <div className="note-item-body">
                  <div className="note-meta" style={{marginBottom: '4px'}}><strong>Lucas Did</strong> · <span>Today 8:15:19 AM</span></div>
                  <div className="note-text">Michael confirmed budget approval for Q1 marketing strategy. Moving forward with the $85K proposal. He mentioned the legal team will need until next week to review the contract terms. I'll schedule a follow-up call to align on timeline.</div>
                </div>
                <div className="note-actions" style={{flexShrink: '0', position: 'relative'}}>
                  <button className="note-menu-btn" onClick={(e) => (window as any).toggleNoteMenu(e.currentTarget)}>···</button>
                  <div className="note-dropdown" style={{display: 'none'}}>
                    <div className="field-popup-menu popup-menu-120" style={{position: 'relative', boxShadow: 'var(--box-shadow-medium)'}}>
                      <a className="field-popup-menu-list-item" onClick={(e) => (window as any).editNote(e.currentTarget)}>Edit</a>
                      <a className="field-popup-menu-list-item field-popup-menu-list-item--danger" onClick={(e) => (window as any).deleteNote(e.currentTarget)}>Delete</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note 2: Laura Albany */}
              <div className="note-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/women/65.jpg\')'}}></div>
                </div>
                <div className="note-item-body">
                  <div className="note-meta" style={{marginBottom: '4px'}}><strong>Laura Albany</strong> · <span>Jan 18, 2026 2:30:00 PM</span></div>
                  <div className="note-text">Follow-up with legal on contract review. They have a few amendments around the termination clause. Will send revised version by EOD Thursday.</div>
                </div>
                <div className="note-actions" style={{flexShrink: '0', position: 'relative'}}>
                  <button className="note-menu-btn" onClick={(e) => (window as any).toggleNoteMenu(e.currentTarget)}>···</button>
                  <div className="note-dropdown" style={{display: 'none'}}>
                    <div className="field-popup-menu popup-menu-120" style={{position: 'relative', boxShadow: 'var(--box-shadow-medium)'}}>
                      <a className="field-popup-menu-list-item" onClick={(e) => (window as any).editNote(e.currentTarget)}>Edit</a>
                      <a className="field-popup-menu-list-item field-popup-menu-list-item--danger" onClick={(e) => (window as any).deleteNote(e.currentTarget)}>Delete</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note 3: Lucas Did Jan 14 */}
              <div className="note-item">
                <div className="activity-item-left">
                  <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div>
                </div>
                <div className="note-item-body">
                  <div className="note-meta" style={{marginBottom: '4px'}}><strong>Lucas Did</strong> · <span>Jan 14, 2026 10:00:00 AM</span></div>
                  <div className="note-text">Kickoff call went well. Michael wants to prioritize the brand refresh deliverables before the campaign launch. Agreed on bi-weekly syncs.</div>
                </div>
                <div className="note-actions" style={{flexShrink: '0', position: 'relative'}}>
                  <button className="note-menu-btn" onClick={(e) => (window as any).toggleNoteMenu(e.currentTarget)}>···</button>
                  <div className="note-dropdown" style={{display: 'none'}}>
                    <div className="field-popup-menu popup-menu-120" style={{position: 'relative', boxShadow: 'var(--box-shadow-medium)'}}>
                      <a className="field-popup-menu-list-item" onClick={(e) => (window as any).editNote(e.currentTarget)}>Edit</a>
                      <a className="field-popup-menu-list-item field-popup-menu-list-item--danger" onClick={(e) => (window as any).deleteNote(e.currentTarget)}>Delete</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── MEETINGS TAB ── */}
          <div id="tab-meetings" className="tab-panel" style={{padding: '0', overflow: 'hidden'}}>

            {/* Title */}
            <div className="tab-section-title-row">
              <span className="tab-section-title">Meetings</span>
            </div>

            {/* Toolbar */}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 14px 0'}}>
              <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                <svg style={{position: 'absolute', left: '9px', color: 'var(--text-lighter)', pointerEvents: 'none'}} width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="5.5" cy="5.5" r="4"/><path d="M9.5 9.5l2 2" strokeLinecap="round"/></svg>
                <input type="text" className="form-field input-smd" placeholder="Search meetings..." style={{paddingLeft: '30px', width: '220px'}} />
              </div>
              <a className="btn btn-default btn-smd btn-dropdown-dots"><svg className="top-action-btn-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a>
            </div>

            {/* List Grid */}
            <div style={{overflowX: 'auto'}}>
              <div className="list-grid pb20">

                {/* Column Headers */}
                <div className="list-grid-col-headers">
                  <div className="list-grid-col-header list-grid-col-header-title" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '5', paddingLeft: '0'}}>Meeting</div>
                  <div className="list-grid-col-header list-grid-col-header-ordered-desc" style={{width: '130px', minWidth: '130px'}}>Date <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor" style={{marginLeft: '3px', opacity: '.5', flexShrink: '0'}}><path d="M4 5L0 0h8z"/></svg></div>
                  <div className="list-grid-col-header" style={{width: '100px', minWidth: '100px'}}>Duration</div>
                  <div className="list-grid-col-header" style={{width: '160px', minWidth: '160px'}}>Owner</div>
                  <div className="list-grid-col-header" style={{width: '130px', minWidth: '130px'}}>Invitees</div>
                  <div className="list-grid-col-header" style={{width: '320px', minWidth: '320px'}}>Assets</div>
                  <div className="list-grid-col-header" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '5', flex: '1'}}></div>
                </div>

                {/* Grid Items */}
                <div className="list-grid-items relative">
                  <div className="list-grid-item list-grid-item-depth-0 list-grid-item-root">
                    <div className="list-grid-item-cell list-grid-item-title list-grid-item-pinned-left-end" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '4', paddingLeft: '0'}}>
                      <div className="flex align-center gap-10 min-width-0"><span className="overflow-ellipsis">Q2 Campaign Kickoff &#8212; Northside Hotel</span></div>
                      <a className="list-grid-item-link-bg" onClick={() => (window as any).openMeetingPanel(0)}></a>
                    </div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px', fontSize: '13px', color: 'var(--text-muted)'}}>Feb 19, 2026</div>
                    <div className="list-grid-item-cell" style={{width: '100px', minWidth: '100px', fontSize: '13px', color: 'var(--text-muted)'}}>1h 15m</div>
                    <div className="list-grid-item-cell" style={{width: '160px', minWidth: '160px'}}><div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><span style={{fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>Lucas Didier</span></div></div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px'}}><div className="meetings-avatar-stack"><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=AC&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/62.jpg\')'}}></div></div></div>
                    <div className="list-grid-item-cell" style={{width: '320px', minWidth: '320px'}}><div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon category-tag-icon--play-icon ml2" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20415 0.297574C2.01735 -0.176537 2.82772 0.0161719 3.31254 0.192105C3.78086 0.36205 4.32422 0.659725 4.84282 0.939175L9.23247 3.30441C9.80345 3.61209 10.3895 3.92419 10.8125 4.23898C11.2107 4.53529 11.8164 5.08927 11.8995 5.98605L11.9092 6.16964V6.22238C11.8984 7.22806 11.2372 7.83796 10.8125 8.15402C10.3896 8.4687 9.80326 8.78004 9.23247 9.08761L4.84282 11.4528C4.32425 11.7323 3.78084 12.03 3.31254 12.1999C2.82769 12.3759 2.01741 12.5687 1.20415 12.0944C1.18974 12.086 1.17529 12.0777 1.16118 12.0691C0.357852 11.5781 0.143517 10.7727 0.0684043 10.2624C-0.00411026 9.76957 4.49002e-05 9.15025 4.49002e-05 8.56125V3.83078C4.49002e-05 3.24168 -0.00414424 2.62249 0.0684043 2.12961C0.143529 1.61929 0.357901 0.813909 1.16118 0.322964L1.20415 0.297574ZM1.55962 8.56125C1.55962 9.84325 1.55995 10.4845 1.97465 10.738C1.97952 10.741 1.98438 10.7439 1.9893 10.7468C2.30422 10.9304 2.70091 10.806 3.35551 10.4753L4.10258 10.0798L8.49223 7.71457C9.64934 7.09105 10.2639 6.75956 10.3409 6.29953L10.3497 6.20578C10.3497 6.19968 10.3497 6.19331 10.3497 6.18722C10.3455 5.80383 9.99658 5.52096 9.3018 5.12277L8.49223 4.67746L4.10258 2.31222C2.974 1.70407 2.40916 1.40039 1.9893 1.64523C1.98439 1.6481 1.97951 1.65105 1.97465 1.65402C1.55995 1.90748 1.55962 2.54877 1.55962 3.83078V8.56125Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Recording</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-primary)'}}></div></div><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.46446 7.82701C3.62065 7.93843 3.80776 7.99824 3.99962 7.99806C4.19148 7.99788 4.37848 7.93772 4.53446 7.82601C4.69038 7.70946 4.80889 7.54994 4.87546 7.36701L5.22246 6.30001C5.30569 6.04862 5.4465 5.82016 5.63366 5.63283C5.82082 5.44549 6.04915 5.30447 6.30046 5.22101L7.38646 4.86801C7.56858 4.80268 7.72557 4.68178 7.83524 4.52237C7.94491 4.36297 8.00172 4.17314 7.99763 3.9797C7.99354 3.78625 7.92876 3.59899 7.81245 3.44436C7.69614 3.28974 7.53418 3.17558 7.34946 3.11801L6.28046 2.77201C6.02889 2.68891 5.80023 2.54816 5.61271 2.36099C5.4252 2.17383 5.28403 1.94542 5.20046 1.69401L4.84746 0.610008C4.7834 0.431001 4.66545 0.276238 4.50983 0.167003C4.35422 0.0577692 4.16858 -0.000570284 3.97846 8.33508e-06C3.78561 -0.000812336 3.59738 0.0589884 3.44037 0.17096C3.28336 0.282932 3.1655 0.441414 3.10346 0.624008L2.74746 1.71401C2.66386 1.95797 2.52617 2.17986 2.34468 2.36308C2.16319 2.5463 1.94262 2.6861 1.69946 2.77201L0.615459 3.12301C0.434367 3.187 0.277749 3.3059 0.167432 3.46313C0.0571155 3.62035 -0.00140521 3.80808 2.56258e-05 4.00014C0.00145646 4.1922 0.0627675 4.37904 0.175415 4.5346C0.288062 4.69017 0.446433 4.80672 0.628459 4.86801L1.69546 5.21501C1.94737 5.29917 2.17622 5.44086 2.36386 5.62885C2.55149 5.81683 2.69276 6.04594 2.77646 6.29801L3.12846 7.37801C3.19146 7.55801 3.30946 7.71501 3.46546 7.82601M8.53346 11.848C8.66926 11.9446 8.83183 11.9963 8.99846 11.996C9.16638 11.9943 9.32962 11.9405 9.4656 11.8419C9.60157 11.7434 9.70357 11.6051 9.75746 11.446L10.0055 10.684C10.0585 10.526 10.1485 10.381 10.2655 10.263C10.3825 10.145 10.5275 10.056 10.6855 10.004L11.4575 9.75201C11.6171 9.69726 11.7554 9.5934 11.8525 9.45531C11.9495 9.31721 12.0004 9.15194 11.9979 8.98316C11.9953 8.81438 11.9395 8.65073 11.8383 8.51563C11.7371 8.38053 11.5957 8.28091 11.4345 8.23101L10.6705 7.98201C10.5125 7.92909 10.3689 7.84036 10.251 7.72274C10.133 7.60512 10.0438 7.46181 9.99046 7.30401L9.73846 6.53001C9.68424 6.37105 9.58138 6.23319 9.44444 6.13596C9.3075 6.03873 9.14343 5.98707 8.97549 5.98829C8.80755 5.9895 8.64425 6.04354 8.50874 6.14275C8.37322 6.24195 8.27237 6.38129 8.22046 6.54101L7.97346 7.30301C7.92252 7.45966 7.83609 7.60244 7.72092 7.72021C7.60575 7.83799 7.46494 7.92758 7.30946 7.98201L6.53346 8.23501C6.416 8.27585 6.30967 8.34351 6.22293 8.43262C6.13618 8.52173 6.07141 8.62984 6.03375 8.74836C5.99608 8.86688 5.98657 8.99255 6.00596 9.11539C6.02535 9.23823 6.07312 9.35485 6.14546 9.45601C6.24446 9.59601 6.38446 9.70101 6.54546 9.75601L7.30846 10.003C7.46695 10.0564 7.61087 10.1459 7.72887 10.2644C7.84688 10.383 7.93574 10.5273 7.98846 10.686L8.24146 11.46C8.29624 11.6165 8.39828 11.7521 8.53346 11.848Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Summary</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-blue)'}}></div></div><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4697 0H2.96973C2.24039 0 1.54094 0.289792 1.02514 0.8055C0.509435 1.32121 0.219727 2.02067 0.219727 2.75V12.5C0.219727 13.2294 0.509435 13.9289 1.02514 14.4446C1.54094 14.9603 2.24039 15.25 2.96973 15.25H6.82473L9.04723 17.25C9.36802 17.5368 9.78323 17.6953 10.2135 17.6953C10.6437 17.6953 11.0589 17.5368 11.3797 17.25L13.6022 15.25H17.4697C18.1991 15.25 18.8985 14.9603 19.4143 14.4446C19.93 13.9289 20.2197 13.2294 20.2197 12.5V2.75C20.2197 2.02067 19.93 1.32121 19.4143 0.8055C18.8985 0.289792 18.1991 0 17.4697 0ZM18.2197 12.5C18.2197 12.699 18.1407 12.8897 18.0001 13.0304C17.8594 13.171 17.6686 13.25 17.4697 13.25H13.2197C12.974 13.2485 12.7365 13.3376 12.5522 13.5L10.2197 15.5925L7.87975 13.5C7.6955 13.3376 7.45787 13.2485 7.21227 13.25H2.96977C2.77087 13.25 2.58012 13.171 2.43941 13.0304C2.29879 12.8897 2.21977 12.699 2.21977 12.5V2.75C2.21977 2.55111 2.29879 2.36035 2.43941 2.21973C2.58012 2.07902 2.77087 2 2.96977 2H17.4698C17.6687 2 17.8594 2.07902 18.0001 2.21973C18.1407 2.36035 18.2198 2.5511 18.2198 2.75L18.2197 12.5Z" fill="#22AD01"></path><path d="M7.58008 7.78516C7.58008 8.68261 6.85254 9.41016 5.95508 9.41016C5.05762 9.41016 4.33008 8.68261 4.33008 7.78516C4.33008 6.8877 5.05762 6.16016 5.95508 6.16016C6.85254 6.16016 7.58008 6.8877 7.58008 7.78516Z" fill="#22AD01"></path><path d="M12.0947 7.78516C12.0947 8.68261 11.3672 9.41016 10.4697 9.41016C9.57227 9.41016 8.84473 8.68261 8.84473 7.78516C8.84473 6.8877 9.57227 6.16016 10.4697 6.16016C11.3672 6.16016 12.0947 6.8877 12.0947 7.78516Z" fill="#22AD01"></path><path d="M16.6094 7.78516C16.6094 8.68261 15.8818 9.41016 14.9844 9.41016C14.0869 9.41016 13.3594 8.68261 13.3594 7.78516C13.3594 6.8877 14.0869 6.16016 14.9844 6.16016C15.8818 6.16016 16.6094 6.8877 16.6094 7.78516Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Transcript</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-purple)'}}></div></div></div></div>
                    <div className="list-grid-item-cell list-grid-item-dropdown" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '4', justifyContent: 'flex-end', paddingRight: '8px', flex: '1'}}><div className="list-item-dd-toggle list-item-dots"><a className="list-item-dd-toggle-link"><svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a></div></div>
                  </div>
                  <div className="list-grid-item list-grid-item-depth-0 list-grid-item-root">
                    <div className="list-grid-item-cell list-grid-item-title list-grid-item-pinned-left-end" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '4', paddingLeft: '0'}}>
                      <div className="flex align-center gap-10 min-width-0"><span className="overflow-ellipsis">Full-Service Proposal &#8212; Bloom Organics</span></div>
                      <a className="list-grid-item-link-bg" onClick={() => (window as any).openMeetingPanel(1)}></a>
                    </div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px', fontSize: '13px', color: 'var(--text-muted)'}}>Feb 17, 2026</div>
                    <div className="list-grid-item-cell" style={{width: '100px', minWidth: '100px', fontSize: '13px', color: 'var(--text-muted)'}}>47m</div>
                    <div className="list-grid-item-cell" style={{width: '160px', minWidth: '160px'}}><div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><span style={{fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>Lucas Didier</span></div></div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px'}}><div className="meetings-avatar-stack"><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png\')'}}></div></div></div>
                    <div className="list-grid-item-cell" style={{width: '320px', minWidth: '320px'}}><div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon category-tag-icon--play-icon ml2" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20415 0.297574C2.01735 -0.176537 2.82772 0.0161719 3.31254 0.192105C3.78086 0.36205 4.32422 0.659725 4.84282 0.939175L9.23247 3.30441C9.80345 3.61209 10.3895 3.92419 10.8125 4.23898C11.2107 4.53529 11.8164 5.08927 11.8995 5.98605L11.9092 6.16964V6.22238C11.8984 7.22806 11.2372 7.83796 10.8125 8.15402C10.3896 8.4687 9.80326 8.78004 9.23247 9.08761L4.84282 11.4528C4.32425 11.7323 3.78084 12.03 3.31254 12.1999C2.82769 12.3759 2.01741 12.5687 1.20415 12.0944C1.18974 12.086 1.17529 12.0777 1.16118 12.0691C0.357852 11.5781 0.143517 10.7727 0.0684043 10.2624C-0.00411026 9.76957 4.49002e-05 9.15025 4.49002e-05 8.56125V3.83078C4.49002e-05 3.24168 -0.00414424 2.62249 0.0684043 2.12961C0.143529 1.61929 0.357901 0.813909 1.16118 0.322964L1.20415 0.297574ZM1.55962 8.56125C1.55962 9.84325 1.55995 10.4845 1.97465 10.738C1.97952 10.741 1.98438 10.7439 1.9893 10.7468C2.30422 10.9304 2.70091 10.806 3.35551 10.4753L4.10258 10.0798L8.49223 7.71457C9.64934 7.09105 10.2639 6.75956 10.3409 6.29953L10.3497 6.20578C10.3497 6.19968 10.3497 6.19331 10.3497 6.18722C10.3455 5.80383 9.99658 5.52096 9.3018 5.12277L8.49223 4.67746L4.10258 2.31222C2.974 1.70407 2.40916 1.40039 1.9893 1.64523C1.98439 1.6481 1.97951 1.65105 1.97465 1.65402C1.55995 1.90748 1.55962 2.54877 1.55962 3.83078V8.56125Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Recording</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-primary)'}}></div></div><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.46446 7.82701C3.62065 7.93843 3.80776 7.99824 3.99962 7.99806C4.19148 7.99788 4.37848 7.93772 4.53446 7.82601C4.69038 7.70946 4.80889 7.54994 4.87546 7.36701L5.22246 6.30001C5.30569 6.04862 5.4465 5.82016 5.63366 5.63283C5.82082 5.44549 6.04915 5.30447 6.30046 5.22101L7.38646 4.86801C7.56858 4.80268 7.72557 4.68178 7.83524 4.52237C7.94491 4.36297 8.00172 4.17314 7.99763 3.9797C7.99354 3.78625 7.92876 3.59899 7.81245 3.44436C7.69614 3.28974 7.53418 3.17558 7.34946 3.11801L6.28046 2.77201C6.02889 2.68891 5.80023 2.54816 5.61271 2.36099C5.4252 2.17383 5.28403 1.94542 5.20046 1.69401L4.84746 0.610008C4.7834 0.431001 4.66545 0.276238 4.50983 0.167003C4.35422 0.0577692 4.16858 -0.000570284 3.97846 8.33508e-06C3.78561 -0.000812336 3.59738 0.0589884 3.44037 0.17096C3.28336 0.282932 3.1655 0.441414 3.10346 0.624008L2.74746 1.71401C2.66386 1.95797 2.52617 2.17986 2.34468 2.36308C2.16319 2.5463 1.94262 2.6861 1.69946 2.77201L0.615459 3.12301C0.434367 3.187 0.277749 3.3059 0.167432 3.46313C0.0571155 3.62035 -0.00140521 3.80808 2.56258e-05 4.00014C0.00145646 4.1922 0.0627675 4.37904 0.175415 4.5346C0.288062 4.69017 0.446433 4.80672 0.628459 4.86801L1.69546 5.21501C1.94737 5.29917 2.17622 5.44086 2.36386 5.62885C2.55149 5.81683 2.69276 6.04594 2.77646 6.29801L3.12846 7.37801C3.19146 7.55801 3.30946 7.71501 3.46546 7.82601M8.53346 11.848C8.66926 11.9446 8.83183 11.9963 8.99846 11.996C9.16638 11.9943 9.32962 11.9405 9.4656 11.8419C9.60157 11.7434 9.70357 11.6051 9.75746 11.446L10.0055 10.684C10.0585 10.526 10.1485 10.381 10.2655 10.263C10.3825 10.145 10.5275 10.056 10.6855 10.004L11.4575 9.75201C11.6171 9.69726 11.7554 9.5934 11.8525 9.45531C11.9495 9.31721 12.0004 9.15194 11.9979 8.98316C11.9953 8.81438 11.9395 8.65073 11.8383 8.51563C11.7371 8.38053 11.5957 8.28091 11.4345 8.23101L10.6705 7.98201C10.5125 7.92909 10.3689 7.84036 10.251 7.72274C10.133 7.60512 10.0438 7.46181 9.99046 7.30401L9.73846 6.53001C9.68424 6.37105 9.58138 6.23319 9.44444 6.13596C9.3075 6.03873 9.14343 5.98707 8.97549 5.98829C8.80755 5.9895 8.64425 6.04354 8.50874 6.14275C8.37322 6.24195 8.27237 6.38129 8.22046 6.54101L7.97346 7.30301C7.92252 7.45966 7.83609 7.60244 7.72092 7.72021C7.60575 7.83799 7.46494 7.92758 7.30946 7.98201L6.53346 8.23501C6.416 8.27585 6.30967 8.34351 6.22293 8.43262C6.13618 8.52173 6.07141 8.62984 6.03375 8.74836C5.99608 8.86688 5.98657 8.99255 6.00596 9.11539C6.02535 9.23823 6.07312 9.35485 6.14546 9.45601C6.24446 9.59601 6.38446 9.70101 6.54546 9.75601L7.30846 10.003C7.46695 10.0564 7.61087 10.1459 7.72887 10.2644C7.84688 10.383 7.93574 10.5273 7.98846 10.686L8.24146 11.46C8.29624 11.6165 8.39828 11.7521 8.53346 11.848Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Summary</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-blue)'}}></div></div></div></div>
                    <div className="list-grid-item-cell list-grid-item-dropdown" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '4', justifyContent: 'flex-end', paddingRight: '8px', flex: '1'}}><div className="list-item-dd-toggle list-item-dots"><a className="list-item-dd-toggle-link"><svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a></div></div>
                  </div>
                  <div className="list-grid-item list-grid-item-depth-0 list-grid-item-root">
                    <div className="list-grid-item-cell list-grid-item-title list-grid-item-pinned-left-end" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '4', paddingLeft: '0'}}>
                      <div className="flex align-center gap-10 min-width-0"><span className="overflow-ellipsis">Q4 Campaign Review &amp; 2026 Planning &#8212; Vertex Legal</span></div>
                      <a className="list-grid-item-link-bg" onClick={() => (window as any).openMeetingPanel(2)}></a>
                    </div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px', fontSize: '13px', color: 'var(--text-muted)'}}>Feb 14, 2026</div>
                    <div className="list-grid-item-cell" style={{width: '100px', minWidth: '100px', fontSize: '13px', color: 'var(--text-muted)'}}>1h 30m</div>
                    <div className="list-grid-item-cell" style={{width: '160px', minWidth: '160px'}}><div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><span style={{fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>Lucas Didier</span></div></div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px'}}><div className="meetings-avatar-stack"><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=AC&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><div className="meetings-user-avatar" style={{backgroundColor: 'var(--bg-grey-f5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: 'var(--text-muted)', fontWeight: '600'}}>+1</div></div></div>
                    <div className="list-grid-item-cell" style={{width: '320px', minWidth: '320px'}}><div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon category-tag-icon--play-icon ml2" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20415 0.297574C2.01735 -0.176537 2.82772 0.0161719 3.31254 0.192105C3.78086 0.36205 4.32422 0.659725 4.84282 0.939175L9.23247 3.30441C9.80345 3.61209 10.3895 3.92419 10.8125 4.23898C11.2107 4.53529 11.8164 5.08927 11.8995 5.98605L11.9092 6.16964V6.22238C11.8984 7.22806 11.2372 7.83796 10.8125 8.15402C10.3896 8.4687 9.80326 8.78004 9.23247 9.08761L4.84282 11.4528C4.32425 11.7323 3.78084 12.03 3.31254 12.1999C2.82769 12.3759 2.01741 12.5687 1.20415 12.0944C1.18974 12.086 1.17529 12.0777 1.16118 12.0691C0.357852 11.5781 0.143517 10.7727 0.0684043 10.2624C-0.00411026 9.76957 4.49002e-05 9.15025 4.49002e-05 8.56125V3.83078C4.49002e-05 3.24168 -0.00414424 2.62249 0.0684043 2.12961C0.143529 1.61929 0.357901 0.813909 1.16118 0.322964L1.20415 0.297574ZM1.55962 8.56125C1.55962 9.84325 1.55995 10.4845 1.97465 10.738C1.97952 10.741 1.98438 10.7439 1.9893 10.7468C2.30422 10.9304 2.70091 10.806 3.35551 10.4753L4.10258 10.0798L8.49223 7.71457C9.64934 7.09105 10.2639 6.75956 10.3409 6.29953L10.3497 6.20578C10.3497 6.19968 10.3497 6.19331 10.3497 6.18722C10.3455 5.80383 9.99658 5.52096 9.3018 5.12277L8.49223 4.67746L4.10258 2.31222C2.974 1.70407 2.40916 1.40039 1.9893 1.64523C1.98439 1.6481 1.97951 1.65105 1.97465 1.65402C1.55995 1.90748 1.55962 2.54877 1.55962 3.83078V8.56125Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Recording</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-primary)'}}></div></div><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.46446 7.82701C3.62065 7.93843 3.80776 7.99824 3.99962 7.99806C4.19148 7.99788 4.37848 7.93772 4.53446 7.82601C4.69038 7.70946 4.80889 7.54994 4.87546 7.36701L5.22246 6.30001C5.30569 6.04862 5.4465 5.82016 5.63366 5.63283C5.82082 5.44549 6.04915 5.30447 6.30046 5.22101L7.38646 4.86801C7.56858 4.80268 7.72557 4.68178 7.83524 4.52237C7.94491 4.36297 8.00172 4.17314 7.99763 3.9797C7.99354 3.78625 7.92876 3.59899 7.81245 3.44436C7.69614 3.28974 7.53418 3.17558 7.34946 3.11801L6.28046 2.77201C6.02889 2.68891 5.80023 2.54816 5.61271 2.36099C5.4252 2.17383 5.28403 1.94542 5.20046 1.69401L4.84746 0.610008C4.7834 0.431001 4.66545 0.276238 4.50983 0.167003C4.35422 0.0577692 4.16858 -0.000570284 3.97846 8.33508e-06C3.78561 -0.000812336 3.59738 0.0589884 3.44037 0.17096C3.28336 0.282932 3.1655 0.441414 3.10346 0.624008L2.74746 1.71401C2.66386 1.95797 2.52617 2.17986 2.34468 2.36308C2.16319 2.5463 1.94262 2.6861 1.69946 2.77201L0.615459 3.12301C0.434367 3.187 0.277749 3.3059 0.167432 3.46313C0.0571155 3.62035 -0.00140521 3.80808 2.56258e-05 4.00014C0.00145646 4.1922 0.0627675 4.37904 0.175415 4.5346C0.288062 4.69017 0.446433 4.80672 0.628459 4.86801L1.69546 5.21501C1.94737 5.29917 2.17622 5.44086 2.36386 5.62885C2.55149 5.81683 2.69276 6.04594 2.77646 6.29801L3.12846 7.37801C3.19146 7.55801 3.30946 7.71501 3.46546 7.82601M8.53346 11.848C8.66926 11.9446 8.83183 11.9963 8.99846 11.996C9.16638 11.9943 9.32962 11.9405 9.4656 11.8419C9.60157 11.7434 9.70357 11.6051 9.75746 11.446L10.0055 10.684C10.0585 10.526 10.1485 10.381 10.2655 10.263C10.3825 10.145 10.5275 10.056 10.6855 10.004L11.4575 9.75201C11.6171 9.69726 11.7554 9.5934 11.8525 9.45531C11.9495 9.31721 12.0004 9.15194 11.9979 8.98316C11.9953 8.81438 11.9395 8.65073 11.8383 8.51563C11.7371 8.38053 11.5957 8.28091 11.4345 8.23101L10.6705 7.98201C10.5125 7.92909 10.3689 7.84036 10.251 7.72274C10.133 7.60512 10.0438 7.46181 9.99046 7.30401L9.73846 6.53001C9.68424 6.37105 9.58138 6.23319 9.44444 6.13596C9.3075 6.03873 9.14343 5.98707 8.97549 5.98829C8.80755 5.9895 8.64425 6.04354 8.50874 6.14275C8.37322 6.24195 8.27237 6.38129 8.22046 6.54101L7.97346 7.30301C7.92252 7.45966 7.83609 7.60244 7.72092 7.72021C7.60575 7.83799 7.46494 7.92758 7.30946 7.98201L6.53346 8.23501C6.416 8.27585 6.30967 8.34351 6.22293 8.43262C6.13618 8.52173 6.07141 8.62984 6.03375 8.74836C5.99608 8.86688 5.98657 8.99255 6.00596 9.11539C6.02535 9.23823 6.07312 9.35485 6.14546 9.45601C6.24446 9.59601 6.38446 9.70101 6.54546 9.75601L7.30846 10.003C7.46695 10.0564 7.61087 10.1459 7.72887 10.2644C7.84688 10.383 7.93574 10.5273 7.98846 10.686L8.24146 11.46C8.29624 11.6165 8.39828 11.7521 8.53346 11.848Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Summary</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-blue)'}}></div></div><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4697 0H2.96973C2.24039 0 1.54094 0.289792 1.02514 0.8055C0.509435 1.32121 0.219727 2.02067 0.219727 2.75V12.5C0.219727 13.2294 0.509435 13.9289 1.02514 14.4446C1.54094 14.9603 2.24039 15.25 2.96973 15.25H6.82473L9.04723 17.25C9.36802 17.5368 9.78323 17.6953 10.2135 17.6953C10.6437 17.6953 11.0589 17.5368 11.3797 17.25L13.6022 15.25H17.4697C18.1991 15.25 18.8985 14.9603 19.4143 14.4446C19.93 13.9289 20.2197 13.2294 20.2197 12.5V2.75C20.2197 2.02067 19.93 1.32121 19.4143 0.8055C18.8985 0.289792 18.1991 0 17.4697 0ZM18.2197 12.5C18.2197 12.699 18.1407 12.8897 18.0001 13.0304C17.8594 13.171 17.6686 13.25 17.4697 13.25H13.2197C12.974 13.2485 12.7365 13.3376 12.5522 13.5L10.2197 15.5925L7.87975 13.5C7.6955 13.3376 7.45787 13.2485 7.21227 13.25H2.96977C2.77087 13.25 2.58012 13.171 2.43941 13.0304C2.29879 12.8897 2.21977 12.699 2.21977 12.5V2.75C2.21977 2.55111 2.29879 2.36035 2.43941 2.21973C2.58012 2.07902 2.77087 2 2.96977 2H17.4698C17.6687 2 17.8594 2.07902 18.0001 2.21973C18.1407 2.36035 18.2198 2.5511 18.2198 2.75L18.2197 12.5Z" fill="#22AD01"></path><path d="M7.58008 7.78516C7.58008 8.68261 6.85254 9.41016 5.95508 9.41016C5.05762 9.41016 4.33008 8.68261 4.33008 7.78516C4.33008 6.8877 5.05762 6.16016 5.95508 6.16016C6.85254 6.16016 7.58008 6.8877 7.58008 7.78516Z" fill="#22AD01"></path><path d="M12.0947 7.78516C12.0947 8.68261 11.3672 9.41016 10.4697 9.41016C9.57227 9.41016 8.84473 8.68261 8.84473 7.78516C8.84473 6.8877 9.57227 6.16016 10.4697 6.16016C11.3672 6.16016 12.0947 6.8877 12.0947 7.78516Z" fill="#22AD01"></path><path d="M16.6094 7.78516C16.6094 8.68261 15.8818 9.41016 14.9844 9.41016C14.0869 9.41016 13.3594 8.68261 13.3594 7.78516C13.3594 6.8877 14.0869 6.16016 14.9844 6.16016C15.8818 6.16016 16.6094 6.8877 16.6094 7.78516Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Transcript</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-purple)'}}></div></div></div></div>
                    <div className="list-grid-item-cell list-grid-item-dropdown" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '4', justifyContent: 'flex-end', paddingRight: '8px', flex: '1'}}><div className="list-item-dd-toggle list-item-dots"><a className="list-item-dd-toggle-link"><svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a></div></div>
                  </div>
                  <div className="list-grid-item list-grid-item-depth-0 list-grid-item-root">
                    <div className="list-grid-item-cell list-grid-item-title list-grid-item-pinned-left-end" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '4', paddingLeft: '0'}}>
                      <div className="flex align-center gap-10 min-width-0"><span className="overflow-ellipsis">Intro Call &#8212; Coastal Realty Group</span></div>
                      <a className="list-grid-item-link-bg" onClick={() => (window as any).openMeetingPanel(3)}></a>
                    </div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px', fontSize: '13px', color: 'var(--text-muted)'}}>Feb 12, 2026</div>
                    <div className="list-grid-item-cell" style={{width: '100px', minWidth: '100px', fontSize: '13px', color: 'var(--text-muted)'}}>30m</div>
                    <div className="list-grid-item-cell" style={{width: '160px', minWidth: '160px'}}><div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><span style={{fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>Lucas Didier</span></div></div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px'}}><div className="meetings-avatar-stack"><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/62.jpg\')'}}></div></div></div>
                    <div className="list-grid-item-cell" style={{width: '320px', minWidth: '320px'}}><div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon category-tag-icon--play-icon ml2" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20415 0.297574C2.01735 -0.176537 2.82772 0.0161719 3.31254 0.192105C3.78086 0.36205 4.32422 0.659725 4.84282 0.939175L9.23247 3.30441C9.80345 3.61209 10.3895 3.92419 10.8125 4.23898C11.2107 4.53529 11.8164 5.08927 11.8995 5.98605L11.9092 6.16964V6.22238C11.8984 7.22806 11.2372 7.83796 10.8125 8.15402C10.3896 8.4687 9.80326 8.78004 9.23247 9.08761L4.84282 11.4528C4.32425 11.7323 3.78084 12.03 3.31254 12.1999C2.82769 12.3759 2.01741 12.5687 1.20415 12.0944C1.18974 12.086 1.17529 12.0777 1.16118 12.0691C0.357852 11.5781 0.143517 10.7727 0.0684043 10.2624C-0.00411026 9.76957 4.49002e-05 9.15025 4.49002e-05 8.56125V3.83078C4.49002e-05 3.24168 -0.00414424 2.62249 0.0684043 2.12961C0.143529 1.61929 0.357901 0.813909 1.16118 0.322964L1.20415 0.297574ZM1.55962 8.56125C1.55962 9.84325 1.55995 10.4845 1.97465 10.738C1.97952 10.741 1.98438 10.7439 1.9893 10.7468C2.30422 10.9304 2.70091 10.806 3.35551 10.4753L4.10258 10.0798L8.49223 7.71457C9.64934 7.09105 10.2639 6.75956 10.3409 6.29953L10.3497 6.20578C10.3497 6.19968 10.3497 6.19331 10.3497 6.18722C10.3455 5.80383 9.99658 5.52096 9.3018 5.12277L8.49223 4.67746L4.10258 2.31222C2.974 1.70407 2.40916 1.40039 1.9893 1.64523C1.98439 1.6481 1.97951 1.65105 1.97465 1.65402C1.55995 1.90748 1.55962 2.54877 1.55962 3.83078V8.56125Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Recording</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-primary)'}}></div></div></div></div>
                    <div className="list-grid-item-cell list-grid-item-dropdown" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '4', justifyContent: 'flex-end', paddingRight: '8px', flex: '1'}}><div className="list-item-dd-toggle list-item-dots"><a className="list-item-dd-toggle-link"><svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a></div></div>
                  </div>
                  <div className="list-grid-item list-grid-item-depth-0 list-grid-item-root">
                    <div className="list-grid-item-cell list-grid-item-title list-grid-item-pinned-left-end" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '4', paddingLeft: '0'}}>
                      <div className="flex align-center gap-10 min-width-0"><span className="overflow-ellipsis">Monthly Performance Check-in &#8212; Bloom Organics</span></div>
                      <a className="list-grid-item-link-bg" onClick={() => (window as any).openMeetingPanel(4)}></a>
                    </div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px', fontSize: '13px', color: 'var(--text-muted)'}}>Feb 10, 2026</div>
                    <div className="list-grid-item-cell" style={{width: '100px', minWidth: '100px', fontSize: '13px', color: 'var(--text-muted)'}}>45m</div>
                    <div className="list-grid-item-cell" style={{width: '160px', minWidth: '160px'}}><div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><span style={{fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>Lucas Didier</span></div></div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px'}}><div className="meetings-avatar-stack"><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/62.jpg\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/women/28.jpg\')'}}></div></div></div>
                    <div className="list-grid-item-cell" style={{width: '320px', minWidth: '320px'}}><div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.46446 7.82701C3.62065 7.93843 3.80776 7.99824 3.99962 7.99806C4.19148 7.99788 4.37848 7.93772 4.53446 7.82601C4.69038 7.70946 4.80889 7.54994 4.87546 7.36701L5.22246 6.30001C5.30569 6.04862 5.4465 5.82016 5.63366 5.63283C5.82082 5.44549 6.04915 5.30447 6.30046 5.22101L7.38646 4.86801C7.56858 4.80268 7.72557 4.68178 7.83524 4.52237C7.94491 4.36297 8.00172 4.17314 7.99763 3.9797C7.99354 3.78625 7.92876 3.59899 7.81245 3.44436C7.69614 3.28974 7.53418 3.17558 7.34946 3.11801L6.28046 2.77201C6.02889 2.68891 5.80023 2.54816 5.61271 2.36099C5.4252 2.17383 5.28403 1.94542 5.20046 1.69401L4.84746 0.610008C4.7834 0.431001 4.66545 0.276238 4.50983 0.167003C4.35422 0.0577692 4.16858 -0.000570284 3.97846 8.33508e-06C3.78561 -0.000812336 3.59738 0.0589884 3.44037 0.17096C3.28336 0.282932 3.1655 0.441414 3.10346 0.624008L2.74746 1.71401C2.66386 1.95797 2.52617 2.17986 2.34468 2.36308C2.16319 2.5463 1.94262 2.6861 1.69946 2.77201L0.615459 3.12301C0.434367 3.187 0.277749 3.3059 0.167432 3.46313C0.0571155 3.62035 -0.00140521 3.80808 2.56258e-05 4.00014C0.00145646 4.1922 0.0627675 4.37904 0.175415 4.5346C0.288062 4.69017 0.446433 4.80672 0.628459 4.86801L1.69546 5.21501C1.94737 5.29917 2.17622 5.44086 2.36386 5.62885C2.55149 5.81683 2.69276 6.04594 2.77646 6.29801L3.12846 7.37801C3.19146 7.55801 3.30946 7.71501 3.46546 7.82601M8.53346 11.848C8.66926 11.9446 8.83183 11.9963 8.99846 11.996C9.16638 11.9943 9.32962 11.9405 9.4656 11.8419C9.60157 11.7434 9.70357 11.6051 9.75746 11.446L10.0055 10.684C10.0585 10.526 10.1485 10.381 10.2655 10.263C10.3825 10.145 10.5275 10.056 10.6855 10.004L11.4575 9.75201C11.6171 9.69726 11.7554 9.5934 11.8525 9.45531C11.9495 9.31721 12.0004 9.15194 11.9979 8.98316C11.9953 8.81438 11.9395 8.65073 11.8383 8.51563C11.7371 8.38053 11.5957 8.28091 11.4345 8.23101L10.6705 7.98201C10.5125 7.92909 10.3689 7.84036 10.251 7.72274C10.133 7.60512 10.0438 7.46181 9.99046 7.30401L9.73846 6.53001C9.68424 6.37105 9.58138 6.23319 9.44444 6.13596C9.3075 6.03873 9.14343 5.98707 8.97549 5.98829C8.80755 5.9895 8.64425 6.04354 8.50874 6.14275C8.37322 6.24195 8.27237 6.38129 8.22046 6.54101L7.97346 7.30301C7.92252 7.45966 7.83609 7.60244 7.72092 7.72021C7.60575 7.83799 7.46494 7.92758 7.30946 7.98201L6.53346 8.23501C6.416 8.27585 6.30967 8.34351 6.22293 8.43262C6.13618 8.52173 6.07141 8.62984 6.03375 8.74836C5.99608 8.86688 5.98657 8.99255 6.00596 9.11539C6.02535 9.23823 6.07312 9.35485 6.14546 9.45601C6.24446 9.59601 6.38446 9.70101 6.54546 9.75601L7.30846 10.003C7.46695 10.0564 7.61087 10.1459 7.72887 10.2644C7.84688 10.383 7.93574 10.5273 7.98846 10.686L8.24146 11.46C8.29624 11.6165 8.39828 11.7521 8.53346 11.848Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Summary</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-blue)'}}></div></div><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4697 0H2.96973C2.24039 0 1.54094 0.289792 1.02514 0.8055C0.509435 1.32121 0.219727 2.02067 0.219727 2.75V12.5C0.219727 13.2294 0.509435 13.9289 1.02514 14.4446C1.54094 14.9603 2.24039 15.25 2.96973 15.25H6.82473L9.04723 17.25C9.36802 17.5368 9.78323 17.6953 10.2135 17.6953C10.6437 17.6953 11.0589 17.5368 11.3797 17.25L13.6022 15.25H17.4697C18.1991 15.25 18.8985 14.9603 19.4143 14.4446C19.93 13.9289 20.2197 13.2294 20.2197 12.5V2.75C20.2197 2.02067 19.93 1.32121 19.4143 0.8055C18.8985 0.289792 18.1991 0 17.4697 0ZM18.2197 12.5C18.2197 12.699 18.1407 12.8897 18.0001 13.0304C17.8594 13.171 17.6686 13.25 17.4697 13.25H13.2197C12.974 13.2485 12.7365 13.3376 12.5522 13.5L10.2197 15.5925L7.87975 13.5C7.6955 13.3376 7.45787 13.2485 7.21227 13.25H2.96977C2.77087 13.25 2.58012 13.171 2.43941 13.0304C2.29879 12.8897 2.21977 12.699 2.21977 12.5V2.75C2.21977 2.55111 2.29879 2.36035 2.43941 2.21973C2.58012 2.07902 2.77087 2 2.96977 2H17.4698C17.6687 2 17.8594 2.07902 18.0001 2.21973C18.1407 2.36035 18.2198 2.5511 18.2198 2.75L18.2197 12.5Z" fill="#22AD01"></path><path d="M7.58008 7.78516C7.58008 8.68261 6.85254 9.41016 5.95508 9.41016C5.05762 9.41016 4.33008 8.68261 4.33008 7.78516C4.33008 6.8877 5.05762 6.16016 5.95508 6.16016C6.85254 6.16016 7.58008 6.8877 7.58008 7.78516Z" fill="#22AD01"></path><path d="M12.0947 7.78516C12.0947 8.68261 11.3672 9.41016 10.4697 9.41016C9.57227 9.41016 8.84473 8.68261 8.84473 7.78516C8.84473 6.8877 9.57227 6.16016 10.4697 6.16016C11.3672 6.16016 12.0947 6.8877 12.0947 7.78516Z" fill="#22AD01"></path><path d="M16.6094 7.78516C16.6094 8.68261 15.8818 9.41016 14.9844 9.41016C14.0869 9.41016 13.3594 8.68261 13.3594 7.78516C13.3594 6.8877 14.0869 6.16016 14.9844 6.16016C15.8818 6.16016 16.6094 6.8877 16.6094 7.78516Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Transcript</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-purple)'}}></div></div></div></div>
                    <div className="list-grid-item-cell list-grid-item-dropdown" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '4', justifyContent: 'flex-end', paddingRight: '8px', flex: '1'}}><div className="list-item-dd-toggle list-item-dots"><a className="list-item-dd-toggle-link"><svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a></div></div>
                  </div>
                  <div className="list-grid-item list-grid-item-depth-0 list-grid-item-root">
                    <div className="list-grid-item-cell list-grid-item-title list-grid-item-pinned-left-end" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '4', paddingLeft: '0'}}>
                      <div className="flex align-center gap-10 min-width-0"><span className="overflow-ellipsis">Brand Identity Review &#8212; Vertex Legal</span></div>
                      <a className="list-grid-item-link-bg" onClick={() => (window as any).openMeetingPanel(5)}></a>
                    </div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px', fontSize: '13px', color: 'var(--text-muted)'}}>Feb 7, 2026</div>
                    <div className="list-grid-item-cell" style={{width: '100px', minWidth: '100px', fontSize: '13px', color: 'var(--text-muted)'}}>1h</div>
                    <div className="list-grid-item-cell" style={{width: '160px', minWidth: '160px'}}><div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><span style={{fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>Lucas Didier</span></div></div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px'}}><div className="meetings-avatar-stack"><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=AC&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/18.jpg\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png\')'}}></div></div></div>
                    <div className="list-grid-item-cell" style={{width: '320px', minWidth: '320px'}}><div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon category-tag-icon--play-icon ml2" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20415 0.297574C2.01735 -0.176537 2.82772 0.0161719 3.31254 0.192105C3.78086 0.36205 4.32422 0.659725 4.84282 0.939175L9.23247 3.30441C9.80345 3.61209 10.3895 3.92419 10.8125 4.23898C11.2107 4.53529 11.8164 5.08927 11.8995 5.98605L11.9092 6.16964V6.22238C11.8984 7.22806 11.2372 7.83796 10.8125 8.15402C10.3896 8.4687 9.80326 8.78004 9.23247 9.08761L4.84282 11.4528C4.32425 11.7323 3.78084 12.03 3.31254 12.1999C2.82769 12.3759 2.01741 12.5687 1.20415 12.0944C1.18974 12.086 1.17529 12.0777 1.16118 12.0691C0.357852 11.5781 0.143517 10.7727 0.0684043 10.2624C-0.00411026 9.76957 4.49002e-05 9.15025 4.49002e-05 8.56125V3.83078C4.49002e-05 3.24168 -0.00414424 2.62249 0.0684043 2.12961C0.143529 1.61929 0.357901 0.813909 1.16118 0.322964L1.20415 0.297574ZM1.55962 8.56125C1.55962 9.84325 1.55995 10.4845 1.97465 10.738C1.97952 10.741 1.98438 10.7439 1.9893 10.7468C2.30422 10.9304 2.70091 10.806 3.35551 10.4753L4.10258 10.0798L8.49223 7.71457C9.64934 7.09105 10.2639 6.75956 10.3409 6.29953L10.3497 6.20578C10.3497 6.19968 10.3497 6.19331 10.3497 6.18722C10.3455 5.80383 9.99658 5.52096 9.3018 5.12277L8.49223 4.67746L4.10258 2.31222C2.974 1.70407 2.40916 1.40039 1.9893 1.64523C1.98439 1.6481 1.97951 1.65105 1.97465 1.65402C1.55995 1.90748 1.55962 2.54877 1.55962 3.83078V8.56125Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Recording</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-primary)'}}></div></div><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4697 0H2.96973C2.24039 0 1.54094 0.289792 1.02514 0.8055C0.509435 1.32121 0.219727 2.02067 0.219727 2.75V12.5C0.219727 13.2294 0.509435 13.9289 1.02514 14.4446C1.54094 14.9603 2.24039 15.25 2.96973 15.25H6.82473L9.04723 17.25C9.36802 17.5368 9.78323 17.6953 10.2135 17.6953C10.6437 17.6953 11.0589 17.5368 11.3797 17.25L13.6022 15.25H17.4697C18.1991 15.25 18.8985 14.9603 19.4143 14.4446C19.93 13.9289 20.2197 13.2294 20.2197 12.5V2.75C20.2197 2.02067 19.93 1.32121 19.4143 0.8055C18.8985 0.289792 18.1991 0 17.4697 0ZM18.2197 12.5C18.2197 12.699 18.1407 12.8897 18.0001 13.0304C17.8594 13.171 17.6686 13.25 17.4697 13.25H13.2197C12.974 13.2485 12.7365 13.3376 12.5522 13.5L10.2197 15.5925L7.87975 13.5C7.6955 13.3376 7.45787 13.2485 7.21227 13.25H2.96977C2.77087 13.25 2.58012 13.171 2.43941 13.0304C2.29879 12.8897 2.21977 12.699 2.21977 12.5V2.75C2.21977 2.55111 2.29879 2.36035 2.43941 2.21973C2.58012 2.07902 2.77087 2 2.96977 2H17.4698C17.6687 2 17.8594 2.07902 18.0001 2.21973C18.1407 2.36035 18.2198 2.5511 18.2198 2.75L18.2197 12.5Z" fill="#22AD01"></path><path d="M7.58008 7.78516C7.58008 8.68261 6.85254 9.41016 5.95508 9.41016C5.05762 9.41016 4.33008 8.68261 4.33008 7.78516C4.33008 6.8877 5.05762 6.16016 5.95508 6.16016C6.85254 6.16016 7.58008 6.8877 7.58008 7.78516Z" fill="#22AD01"></path><path d="M12.0947 7.78516C12.0947 8.68261 11.3672 9.41016 10.4697 9.41016C9.57227 9.41016 8.84473 8.68261 8.84473 7.78516C8.84473 6.8877 9.57227 6.16016 10.4697 6.16016C11.3672 6.16016 12.0947 6.8877 12.0947 7.78516Z" fill="#22AD01"></path><path d="M16.6094 7.78516C16.6094 8.68261 15.8818 9.41016 14.9844 9.41016C14.0869 9.41016 13.3594 8.68261 13.3594 7.78516C13.3594 6.8877 14.0869 6.16016 14.9844 6.16016C15.8818 6.16016 16.6094 6.8877 16.6094 7.78516Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Transcript</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-purple)'}}></div></div></div></div>
                    <div className="list-grid-item-cell list-grid-item-dropdown" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '4', justifyContent: 'flex-end', paddingRight: '8px', flex: '1'}}><div className="list-item-dd-toggle list-item-dots"><a className="list-item-dd-toggle-link"><svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a></div></div>
                  </div>
                  <div className="list-grid-item list-grid-item-depth-0 list-grid-item-root">
                    <div className="list-grid-item-cell list-grid-item-title list-grid-item-pinned-left-end" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '4', paddingLeft: '0'}}>
                      <div className="flex align-center gap-10 min-width-0"><span className="overflow-ellipsis">Retainer Proposal &#8212; Northside Hotel</span></div>
                      <a className="list-grid-item-link-bg" onClick={() => (window as any).openMeetingPanel(6)}></a>
                    </div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px', fontSize: '13px', color: 'var(--text-muted)'}}>Feb 5, 2026</div>
                    <div className="list-grid-item-cell" style={{width: '100px', minWidth: '100px', fontSize: '13px', color: 'var(--text-muted)'}}>37m</div>
                    <div className="list-grid-item-cell" style={{width: '160px', minWidth: '160px'}}><div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><span style={{fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>Lucas Didier</span></div></div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px'}}><div className="meetings-avatar-stack"><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div></div></div>
                    <div className="list-grid-item-cell" style={{width: '320px', minWidth: '320px'}}><div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon category-tag-icon--play-icon ml2" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20415 0.297574C2.01735 -0.176537 2.82772 0.0161719 3.31254 0.192105C3.78086 0.36205 4.32422 0.659725 4.84282 0.939175L9.23247 3.30441C9.80345 3.61209 10.3895 3.92419 10.8125 4.23898C11.2107 4.53529 11.8164 5.08927 11.8995 5.98605L11.9092 6.16964V6.22238C11.8984 7.22806 11.2372 7.83796 10.8125 8.15402C10.3896 8.4687 9.80326 8.78004 9.23247 9.08761L4.84282 11.4528C4.32425 11.7323 3.78084 12.03 3.31254 12.1999C2.82769 12.3759 2.01741 12.5687 1.20415 12.0944C1.18974 12.086 1.17529 12.0777 1.16118 12.0691C0.357852 11.5781 0.143517 10.7727 0.0684043 10.2624C-0.00411026 9.76957 4.49002e-05 9.15025 4.49002e-05 8.56125V3.83078C4.49002e-05 3.24168 -0.00414424 2.62249 0.0684043 2.12961C0.143529 1.61929 0.357901 0.813909 1.16118 0.322964L1.20415 0.297574ZM1.55962 8.56125C1.55962 9.84325 1.55995 10.4845 1.97465 10.738C1.97952 10.741 1.98438 10.7439 1.9893 10.7468C2.30422 10.9304 2.70091 10.806 3.35551 10.4753L4.10258 10.0798L8.49223 7.71457C9.64934 7.09105 10.2639 6.75956 10.3409 6.29953L10.3497 6.20578C10.3497 6.19968 10.3497 6.19331 10.3497 6.18722C10.3455 5.80383 9.99658 5.52096 9.3018 5.12277L8.49223 4.67746L4.10258 2.31222C2.974 1.70407 2.40916 1.40039 1.9893 1.64523C1.98439 1.6481 1.97951 1.65105 1.97465 1.65402C1.55995 1.90748 1.55962 2.54877 1.55962 3.83078V8.56125Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Recording</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-primary)'}}></div></div><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.46446 7.82701C3.62065 7.93843 3.80776 7.99824 3.99962 7.99806C4.19148 7.99788 4.37848 7.93772 4.53446 7.82601C4.69038 7.70946 4.80889 7.54994 4.87546 7.36701L5.22246 6.30001C5.30569 6.04862 5.4465 5.82016 5.63366 5.63283C5.82082 5.44549 6.04915 5.30447 6.30046 5.22101L7.38646 4.86801C7.56858 4.80268 7.72557 4.68178 7.83524 4.52237C7.94491 4.36297 8.00172 4.17314 7.99763 3.9797C7.99354 3.78625 7.92876 3.59899 7.81245 3.44436C7.69614 3.28974 7.53418 3.17558 7.34946 3.11801L6.28046 2.77201C6.02889 2.68891 5.80023 2.54816 5.61271 2.36099C5.4252 2.17383 5.28403 1.94542 5.20046 1.69401L4.84746 0.610008C4.7834 0.431001 4.66545 0.276238 4.50983 0.167003C4.35422 0.0577692 4.16858 -0.000570284 3.97846 8.33508e-06C3.78561 -0.000812336 3.59738 0.0589884 3.44037 0.17096C3.28336 0.282932 3.1655 0.441414 3.10346 0.624008L2.74746 1.71401C2.66386 1.95797 2.52617 2.17986 2.34468 2.36308C2.16319 2.5463 1.94262 2.6861 1.69946 2.77201L0.615459 3.12301C0.434367 3.187 0.277749 3.3059 0.167432 3.46313C0.0571155 3.62035 -0.00140521 3.80808 2.56258e-05 4.00014C0.00145646 4.1922 0.0627675 4.37904 0.175415 4.5346C0.288062 4.69017 0.446433 4.80672 0.628459 4.86801L1.69546 5.21501C1.94737 5.29917 2.17622 5.44086 2.36386 5.62885C2.55149 5.81683 2.69276 6.04594 2.77646 6.29801L3.12846 7.37801C3.19146 7.55801 3.30946 7.71501 3.46546 7.82601M8.53346 11.848C8.66926 11.9446 8.83183 11.9963 8.99846 11.996C9.16638 11.9943 9.32962 11.9405 9.4656 11.8419C9.60157 11.7434 9.70357 11.6051 9.75746 11.446L10.0055 10.684C10.0585 10.526 10.1485 10.381 10.2655 10.263C10.3825 10.145 10.5275 10.056 10.6855 10.004L11.4575 9.75201C11.6171 9.69726 11.7554 9.5934 11.8525 9.45531C11.9495 9.31721 12.0004 9.15194 11.9979 8.98316C11.9953 8.81438 11.9395 8.65073 11.8383 8.51563C11.7371 8.38053 11.5957 8.28091 11.4345 8.23101L10.6705 7.98201C10.5125 7.92909 10.3689 7.84036 10.251 7.72274C10.133 7.60512 10.0438 7.46181 9.99046 7.30401L9.73846 6.53001C9.68424 6.37105 9.58138 6.23319 9.44444 6.13596C9.3075 6.03873 9.14343 5.98707 8.97549 5.98829C8.80755 5.9895 8.64425 6.04354 8.50874 6.14275C8.37322 6.24195 8.27237 6.38129 8.22046 6.54101L7.97346 7.30301C7.92252 7.45966 7.83609 7.60244 7.72092 7.72021C7.60575 7.83799 7.46494 7.92758 7.30946 7.98201L6.53346 8.23501C6.416 8.27585 6.30967 8.34351 6.22293 8.43262C6.13618 8.52173 6.07141 8.62984 6.03375 8.74836C5.99608 8.86688 5.98657 8.99255 6.00596 9.11539C6.02535 9.23823 6.07312 9.35485 6.14546 9.45601C6.24446 9.59601 6.38446 9.70101 6.54546 9.75601L7.30846 10.003C7.46695 10.0564 7.61087 10.1459 7.72887 10.2644C7.84688 10.383 7.93574 10.5273 7.98846 10.686L8.24146 11.46C8.29624 11.6165 8.39828 11.7521 8.53346 11.848Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Summary</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-blue)'}}></div></div></div></div>
                    <div className="list-grid-item-cell list-grid-item-dropdown" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '4', justifyContent: 'flex-end', paddingRight: '8px', flex: '1'}}><div className="list-item-dd-toggle list-item-dots"><a className="list-item-dd-toggle-link"><svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a></div></div>
                  </div>
                  <div className="list-grid-item list-grid-item-depth-0 list-grid-item-root">
                    <div className="list-grid-item-cell list-grid-item-title list-grid-item-pinned-left-end" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '4', paddingLeft: '0'}}>
                      <div className="flex align-center gap-10 min-width-0"><span className="overflow-ellipsis">Onboarding Session Week 1 &#8212; Bloom Organics</span></div>
                      <a className="list-grid-item-link-bg" onClick={() => (window as any).openMeetingPanel(7)}></a>
                    </div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px', fontSize: '13px', color: 'var(--text-muted)'}}>Jan 29, 2026</div>
                    <div className="list-grid-item-cell" style={{width: '100px', minWidth: '100px', fontSize: '13px', color: 'var(--text-muted)'}}>55m</div>
                    <div className="list-grid-item-cell" style={{width: '160px', minWidth: '160px'}}><div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><span style={{fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>Lucas Didier</span></div></div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px'}}><div className="meetings-avatar-stack"><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/62.jpg\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/women/28.jpg\')'}}></div></div></div>
                    <div className="list-grid-item-cell" style={{width: '320px', minWidth: '320px'}}><div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.46446 7.82701C3.62065 7.93843 3.80776 7.99824 3.99962 7.99806C4.19148 7.99788 4.37848 7.93772 4.53446 7.82601C4.69038 7.70946 4.80889 7.54994 4.87546 7.36701L5.22246 6.30001C5.30569 6.04862 5.4465 5.82016 5.63366 5.63283C5.82082 5.44549 6.04915 5.30447 6.30046 5.22101L7.38646 4.86801C7.56858 4.80268 7.72557 4.68178 7.83524 4.52237C7.94491 4.36297 8.00172 4.17314 7.99763 3.9797C7.99354 3.78625 7.92876 3.59899 7.81245 3.44436C7.69614 3.28974 7.53418 3.17558 7.34946 3.11801L6.28046 2.77201C6.02889 2.68891 5.80023 2.54816 5.61271 2.36099C5.4252 2.17383 5.28403 1.94542 5.20046 1.69401L4.84746 0.610008C4.7834 0.431001 4.66545 0.276238 4.50983 0.167003C4.35422 0.0577692 4.16858 -0.000570284 3.97846 8.33508e-06C3.78561 -0.000812336 3.59738 0.0589884 3.44037 0.17096C3.28336 0.282932 3.1655 0.441414 3.10346 0.624008L2.74746 1.71401C2.66386 1.95797 2.52617 2.17986 2.34468 2.36308C2.16319 2.5463 1.94262 2.6861 1.69946 2.77201L0.615459 3.12301C0.434367 3.187 0.277749 3.3059 0.167432 3.46313C0.0571155 3.62035 -0.00140521 3.80808 2.56258e-05 4.00014C0.00145646 4.1922 0.0627675 4.37904 0.175415 4.5346C0.288062 4.69017 0.446433 4.80672 0.628459 4.86801L1.69546 5.21501C1.94737 5.29917 2.17622 5.44086 2.36386 5.62885C2.55149 5.81683 2.69276 6.04594 2.77646 6.29801L3.12846 7.37801C3.19146 7.55801 3.30946 7.71501 3.46546 7.82601M8.53346 11.848C8.66926 11.9446 8.83183 11.9963 8.99846 11.996C9.16638 11.9943 9.32962 11.9405 9.4656 11.8419C9.60157 11.7434 9.70357 11.6051 9.75746 11.446L10.0055 10.684C10.0585 10.526 10.1485 10.381 10.2655 10.263C10.3825 10.145 10.5275 10.056 10.6855 10.004L11.4575 9.75201C11.6171 9.69726 11.7554 9.5934 11.8525 9.45531C11.9495 9.31721 12.0004 9.15194 11.9979 8.98316C11.9953 8.81438 11.9395 8.65073 11.8383 8.51563C11.7371 8.38053 11.5957 8.28091 11.4345 8.23101L10.6705 7.98201C10.5125 7.92909 10.3689 7.84036 10.251 7.72274C10.133 7.60512 10.0438 7.46181 9.99046 7.30401L9.73846 6.53001C9.68424 6.37105 9.58138 6.23319 9.44444 6.13596C9.3075 6.03873 9.14343 5.98707 8.97549 5.98829C8.80755 5.9895 8.64425 6.04354 8.50874 6.14275C8.37322 6.24195 8.27237 6.38129 8.22046 6.54101L7.97346 7.30301C7.92252 7.45966 7.83609 7.60244 7.72092 7.72021C7.60575 7.83799 7.46494 7.92758 7.30946 7.98201L6.53346 8.23501C6.416 8.27585 6.30967 8.34351 6.22293 8.43262C6.13618 8.52173 6.07141 8.62984 6.03375 8.74836C5.99608 8.86688 5.98657 8.99255 6.00596 9.11539C6.02535 9.23823 6.07312 9.35485 6.14546 9.45601C6.24446 9.59601 6.38446 9.70101 6.54546 9.75601L7.30846 10.003C7.46695 10.0564 7.61087 10.1459 7.72887 10.2644C7.84688 10.383 7.93574 10.5273 7.98846 10.686L8.24146 11.46C8.29624 11.6165 8.39828 11.7521 8.53346 11.848Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Summary</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-blue)'}}></div></div></div></div>
                    <div className="list-grid-item-cell list-grid-item-dropdown" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '4', justifyContent: 'flex-end', paddingRight: '8px', flex: '1'}}><div className="list-item-dd-toggle list-item-dots"><a className="list-item-dd-toggle-link"><svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a></div></div>
                  </div>
                  <div className="list-grid-item list-grid-item-depth-0 list-grid-item-root">
                    <div className="list-grid-item-cell list-grid-item-title list-grid-item-pinned-left-end" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '4', paddingLeft: '0'}}>
                      <div className="flex align-center gap-10 min-width-0"><span className="overflow-ellipsis">MarTech Stack Review &#8212; Vertex Legal</span></div>
                      <a className="list-grid-item-link-bg" onClick={() => (window as any).openMeetingPanel(8)}></a>
                    </div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px', fontSize: '13px', color: 'var(--text-muted)'}}>Jan 22, 2026</div>
                    <div className="list-grid-item-cell" style={{width: '100px', minWidth: '100px', fontSize: '13px', color: 'var(--text-muted)'}}>1h 10m</div>
                    <div className="list-grid-item-cell" style={{width: '160px', minWidth: '160px'}}><div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><span style={{fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>Lucas Didier</span></div></div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px'}}><div className="meetings-avatar-stack"><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/18.jpg\')'}}></div></div></div>
                    <div className="list-grid-item-cell" style={{width: '320px', minWidth: '320px'}}><div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon category-tag-icon--play-icon ml2" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20415 0.297574C2.01735 -0.176537 2.82772 0.0161719 3.31254 0.192105C3.78086 0.36205 4.32422 0.659725 4.84282 0.939175L9.23247 3.30441C9.80345 3.61209 10.3895 3.92419 10.8125 4.23898C11.2107 4.53529 11.8164 5.08927 11.8995 5.98605L11.9092 6.16964V6.22238C11.8984 7.22806 11.2372 7.83796 10.8125 8.15402C10.3896 8.4687 9.80326 8.78004 9.23247 9.08761L4.84282 11.4528C4.32425 11.7323 3.78084 12.03 3.31254 12.1999C2.82769 12.3759 2.01741 12.5687 1.20415 12.0944C1.18974 12.086 1.17529 12.0777 1.16118 12.0691C0.357852 11.5781 0.143517 10.7727 0.0684043 10.2624C-0.00411026 9.76957 4.49002e-05 9.15025 4.49002e-05 8.56125V3.83078C4.49002e-05 3.24168 -0.00414424 2.62249 0.0684043 2.12961C0.143529 1.61929 0.357901 0.813909 1.16118 0.322964L1.20415 0.297574ZM1.55962 8.56125C1.55962 9.84325 1.55995 10.4845 1.97465 10.738C1.97952 10.741 1.98438 10.7439 1.9893 10.7468C2.30422 10.9304 2.70091 10.806 3.35551 10.4753L4.10258 10.0798L8.49223 7.71457C9.64934 7.09105 10.2639 6.75956 10.3409 6.29953L10.3497 6.20578C10.3497 6.19968 10.3497 6.19331 10.3497 6.18722C10.3455 5.80383 9.99658 5.52096 9.3018 5.12277L8.49223 4.67746L4.10258 2.31222C2.974 1.70407 2.40916 1.40039 1.9893 1.64523C1.98439 1.6481 1.97951 1.65105 1.97465 1.65402C1.55995 1.90748 1.55962 2.54877 1.55962 3.83078V8.56125Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Recording</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-primary)'}}></div></div><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.46446 7.82701C3.62065 7.93843 3.80776 7.99824 3.99962 7.99806C4.19148 7.99788 4.37848 7.93772 4.53446 7.82601C4.69038 7.70946 4.80889 7.54994 4.87546 7.36701L5.22246 6.30001C5.30569 6.04862 5.4465 5.82016 5.63366 5.63283C5.82082 5.44549 6.04915 5.30447 6.30046 5.22101L7.38646 4.86801C7.56858 4.80268 7.72557 4.68178 7.83524 4.52237C7.94491 4.36297 8.00172 4.17314 7.99763 3.9797C7.99354 3.78625 7.92876 3.59899 7.81245 3.44436C7.69614 3.28974 7.53418 3.17558 7.34946 3.11801L6.28046 2.77201C6.02889 2.68891 5.80023 2.54816 5.61271 2.36099C5.4252 2.17383 5.28403 1.94542 5.20046 1.69401L4.84746 0.610008C4.7834 0.431001 4.66545 0.276238 4.50983 0.167003C4.35422 0.0577692 4.16858 -0.000570284 3.97846 8.33508e-06C3.78561 -0.000812336 3.59738 0.0589884 3.44037 0.17096C3.28336 0.282932 3.1655 0.441414 3.10346 0.624008L2.74746 1.71401C2.66386 1.95797 2.52617 2.17986 2.34468 2.36308C2.16319 2.5463 1.94262 2.6861 1.69946 2.77201L0.615459 3.12301C0.434367 3.187 0.277749 3.3059 0.167432 3.46313C0.0571155 3.62035 -0.00140521 3.80808 2.56258e-05 4.00014C0.00145646 4.1922 0.0627675 4.37904 0.175415 4.5346C0.288062 4.69017 0.446433 4.80672 0.628459 4.86801L1.69546 5.21501C1.94737 5.29917 2.17622 5.44086 2.36386 5.62885C2.55149 5.81683 2.69276 6.04594 2.77646 6.29801L3.12846 7.37801C3.19146 7.55801 3.30946 7.71501 3.46546 7.82601M8.53346 11.848C8.66926 11.9446 8.83183 11.9963 8.99846 11.996C9.16638 11.9943 9.32962 11.9405 9.4656 11.8419C9.60157 11.7434 9.70357 11.6051 9.75746 11.446L10.0055 10.684C10.0585 10.526 10.1485 10.381 10.2655 10.263C10.3825 10.145 10.5275 10.056 10.6855 10.004L11.4575 9.75201C11.6171 9.69726 11.7554 9.5934 11.8525 9.45531C11.9495 9.31721 12.0004 9.15194 11.9979 8.98316C11.9953 8.81438 11.9395 8.65073 11.8383 8.51563C11.7371 8.38053 11.5957 8.28091 11.4345 8.23101L10.6705 7.98201C10.5125 7.92909 10.3689 7.84036 10.251 7.72274C10.133 7.60512 10.0438 7.46181 9.99046 7.30401L9.73846 6.53001C9.68424 6.37105 9.58138 6.23319 9.44444 6.13596C9.3075 6.03873 9.14343 5.98707 8.97549 5.98829C8.80755 5.9895 8.64425 6.04354 8.50874 6.14275C8.37322 6.24195 8.27237 6.38129 8.22046 6.54101L7.97346 7.30301C7.92252 7.45966 7.83609 7.60244 7.72092 7.72021C7.60575 7.83799 7.46494 7.92758 7.30946 7.98201L6.53346 8.23501C6.416 8.27585 6.30967 8.34351 6.22293 8.43262C6.13618 8.52173 6.07141 8.62984 6.03375 8.74836C5.99608 8.86688 5.98657 8.99255 6.00596 9.11539C6.02535 9.23823 6.07312 9.35485 6.14546 9.45601C6.24446 9.59601 6.38446 9.70101 6.54546 9.75601L7.30846 10.003C7.46695 10.0564 7.61087 10.1459 7.72887 10.2644C7.84688 10.383 7.93574 10.5273 7.98846 10.686L8.24146 11.46C8.29624 11.6165 8.39828 11.7521 8.53346 11.848Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Summary</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-blue)'}}></div></div><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon ml2" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4697 0H2.96973C2.24039 0 1.54094 0.289792 1.02514 0.8055C0.509435 1.32121 0.219727 2.02067 0.219727 2.75V12.5C0.219727 13.2294 0.509435 13.9289 1.02514 14.4446C1.54094 14.9603 2.24039 15.25 2.96973 15.25H6.82473L9.04723 17.25C9.36802 17.5368 9.78323 17.6953 10.2135 17.6953C10.6437 17.6953 11.0589 17.5368 11.3797 17.25L13.6022 15.25H17.4697C18.1991 15.25 18.8985 14.9603 19.4143 14.4446C19.93 13.9289 20.2197 13.2294 20.2197 12.5V2.75C20.2197 2.02067 19.93 1.32121 19.4143 0.8055C18.8985 0.289792 18.1991 0 17.4697 0ZM18.2197 12.5C18.2197 12.699 18.1407 12.8897 18.0001 13.0304C17.8594 13.171 17.6686 13.25 17.4697 13.25H13.2197C12.974 13.2485 12.7365 13.3376 12.5522 13.5L10.2197 15.5925L7.87975 13.5C7.6955 13.3376 7.45787 13.2485 7.21227 13.25H2.96977C2.77087 13.25 2.58012 13.171 2.43941 13.0304C2.29879 12.8897 2.21977 12.699 2.21977 12.5V2.75C2.21977 2.55111 2.29879 2.36035 2.43941 2.21973C2.58012 2.07902 2.77087 2 2.96977 2H17.4698C17.6687 2 17.8594 2.07902 18.0001 2.21973C18.1407 2.36035 18.2198 2.5511 18.2198 2.75L18.2197 12.5Z" fill="#22AD01"></path><path d="M7.58008 7.78516C7.58008 8.68261 6.85254 9.41016 5.95508 9.41016C5.05762 9.41016 4.33008 8.68261 4.33008 7.78516C4.33008 6.8877 5.05762 6.16016 5.95508 6.16016C6.85254 6.16016 7.58008 6.8877 7.58008 7.78516Z" fill="#22AD01"></path><path d="M12.0947 7.78516C12.0947 8.68261 11.3672 9.41016 10.4697 9.41016C9.57227 9.41016 8.84473 8.68261 8.84473 7.78516C8.84473 6.8877 9.57227 6.16016 10.4697 6.16016C11.3672 6.16016 12.0947 6.8877 12.0947 7.78516Z" fill="#22AD01"></path><path d="M16.6094 7.78516C16.6094 8.68261 15.8818 9.41016 14.9844 9.41016C14.0869 9.41016 13.3594 8.68261 13.3594 7.78516C13.3594 6.8877 14.0869 6.16016 14.9844 6.16016C15.8818 6.16016 16.6094 6.8877 16.6094 7.78516Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Transcript</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-accent-purple)'}}></div></div></div></div>
                    <div className="list-grid-item-cell list-grid-item-dropdown" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '4', justifyContent: 'flex-end', paddingRight: '8px', flex: '1'}}><div className="list-item-dd-toggle list-item-dots"><a className="list-item-dd-toggle-link"><svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a></div></div>
                  </div>
                  <div className="list-grid-item list-grid-item-depth-0 list-grid-item-root">
                    <div className="list-grid-item-cell list-grid-item-title list-grid-item-pinned-left-end" style={{width: '280px', minWidth: '280px', position: 'sticky', left: '0', zIndex: '4', paddingLeft: '0'}}>
                      <div className="flex align-center gap-10 min-width-0"><span className="overflow-ellipsis">Discovery Call &#8212; Coastal Realty Group</span></div>
                      <a className="list-grid-item-link-bg" onClick={() => (window as any).openMeetingPanel(9)}></a>
                    </div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px', fontSize: '13px', color: 'var(--text-muted)'}}>Jan 15, 2026</div>
                    <div className="list-grid-item-cell" style={{width: '100px', minWidth: '100px', fontSize: '13px', color: 'var(--text-muted)'}}>25m</div>
                    <div className="list-grid-item-cell" style={{width: '160px', minWidth: '160px'}}><div style={{display: 'flex', alignItems: 'center', gap: '7px'}}><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=LD&size=250&background=4c525a&color=ffffff&format=png\')'}}></div><span style={{fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>Lucas Didier</span></div></div>
                    <div className="list-grid-item-cell" style={{width: '130px', minWidth: '130px'}}><div className="meetings-avatar-stack"><div className="meetings-user-avatar" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=AC&size=250&background=4c525a&color=ffffff&format=png\')'}}></div></div></div>
                    <div className="list-grid-item-cell" style={{width: '320px', minWidth: '320px'}}><div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div className="category-tag overflow-ellipsis tag-xs"><svg className="category-tag-icon category-tag-icon--play-icon ml2" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20415 0.297574C2.01735 -0.176537 2.82772 0.0161719 3.31254 0.192105C3.78086 0.36205 4.32422 0.659725 4.84282 0.939175L9.23247 3.30441C9.80345 3.61209 10.3895 3.92419 10.8125 4.23898C11.2107 4.53529 11.8164 5.08927 11.8995 5.98605L11.9092 6.16964V6.22238C11.8984 7.22806 11.2372 7.83796 10.8125 8.15402C10.3896 8.4687 9.80326 8.78004 9.23247 9.08761L4.84282 11.4528C4.32425 11.7323 3.78084 12.03 3.31254 12.1999C2.82769 12.3759 2.01741 12.5687 1.20415 12.0944C1.18974 12.086 1.17529 12.0777 1.16118 12.0691C0.357852 11.5781 0.143517 10.7727 0.0684043 10.2624C-0.00411026 9.76957 4.49002e-05 9.15025 4.49002e-05 8.56125V3.83078C4.49002e-05 3.24168 -0.00414424 2.62249 0.0684043 2.12961C0.143529 1.61929 0.357901 0.813909 1.16118 0.322964L1.20415 0.297574ZM1.55962 8.56125C1.55962 9.84325 1.55995 10.4845 1.97465 10.738C1.97952 10.741 1.98438 10.7439 1.9893 10.7468C2.30422 10.9304 2.70091 10.806 3.35551 10.4753L4.10258 10.0798L8.49223 7.71457C9.64934 7.09105 10.2639 6.75956 10.3409 6.29953L10.3497 6.20578C10.3497 6.19968 10.3497 6.19331 10.3497 6.18722C10.3455 5.80383 9.99658 5.52096 9.3018 5.12277L8.49223 4.67746L4.10258 2.31222C2.974 1.70407 2.40916 1.40039 1.9893 1.64523C1.98439 1.6481 1.97951 1.65105 1.97465 1.65402C1.55995 1.90748 1.55962 2.54877 1.55962 3.83078V8.56125Z" fill="#22AD01"></path></svg><div className="category-tag-label overflow-ellipsis">Recording</div><div className="category-tag-bg" style={{backgroundColor: 'var(--color-primary)'}}></div></div></div></div>
                    <div className="list-grid-item-cell list-grid-item-dropdown" style={{width: '40px', minWidth: '40px', position: 'sticky', right: '0', zIndex: '4', justifyContent: 'flex-end', paddingRight: '8px', flex: '1'}}><div className="list-item-dd-toggle list-item-dots"><a className="list-item-dd-toggle-link"><svg className="list-item-dd-toggle-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001V4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959V3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959V3.99959Z" fill="#0f1010"></path></svg></a></div></div>
                  </div>

                </div>{/* /.list-grid-items */}
              </div>{/* /.list-grid */}
            </div>{/* /overflow-x:auto */}
          </div>

          {/* ── EMAILS TAB ── */}
          <div id="tab-emails" className="tab-panel">

            {/* === DISCONNECTED STATE === */}
            <div id="email-disconnected-state">
              <div className="email-disconnected-centered">
                {/* Large Gmail M logo */}
                <svg width="64" height="48" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginBottom: '22px'}}>
                  <path d="M0 4v26a4 4 0 004 4h8V15.5L0 4z" fill="#EA4335"/>
                  <path d="M46 4v26a4 4 0 01-4 4h-8V15.5L46 4z" fill="#4285F4"/>
                  <path d="M12 34V15.5L23 24l11-8.5V34H12z" fill="#FBBC05"/>
                  <path d="M0 4C0 1.8 1.8 0 4 0h38c2.2 0 4 1.8 4 4L23 18.5 0 4z" fill="#34A853"/>
                </svg>
                <p className="email-disconnected-desc">Connect Gmail to view emails, link messages to contacts, and keep your communication history in one place.</p>
                <button className="btn btn-primary btn-smd" style={{paddingLeft: '24px', paddingRight: '24px'}} onClick={() => (window as any).openConnectGmailModal()}>Connect Gmail</button>
              </div>
            </div>

            {/* === CONNECTED STATE (hidden until after setup) === */}
            <div id="email-connected-state" style={{display: 'none'}}>

              {/* Title row */}
              <div className="tab-section-title-row">
                <span className="tab-section-title">Emails</span>
              </div>

              {/* Toolbar: search + filters left | ··· right */}
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 14px 0'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                    <svg style={{position: 'absolute', left: '9px', color: 'var(--text-lighter)', pointerEvents: 'none'}} width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="5.5" cy="5.5" r="4"/><path d="M9.5 9.5l2 2" strokeLinecap="round"/></svg>
                    <input type="text" className="form-field input-smd" placeholder="Search emails..." style={{paddingLeft: '30px', width: '220px'}} />
                  </div>
                  <button className="btn btn-default btn-smd">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{marginRight: '4px'}}><line x1="1" y1="3" x2="13" y2="3"/><line x1="3" y1="7" x2="11" y2="7"/><line x1="5" y1="11" x2="9" y2="11"/></svg>
                    Filters
                  </button>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  {/* Three-dot menu */}
                  <div className="email-dots-wrap">
                    <a className="btn btn-default btn-smd btn-dropdown-dots" onClick={() => (window as any).toggleEmailDotsMenu(event)} style={{cursor: 'pointer'}}>
                      <svg className="top-action-btn-dots" width="16" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4.00001C0.925013 4.00001 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4.00001 2.07086 4.00001Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.00002 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8.00002 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8.00002 3.99959Z" fill="#0f1010"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959Z" fill="#0f1010"></path></svg>
                    </a>
                    {/* Three-dot dropdown */}
                    <div className="email-dots-dropdown" id="email-dots-menu" style={{display: 'none'}}>
                      <ul style={{margin: '0', padding: '0'}}>
                        <li>
                          <a onClick={() => (window as any).disconnectGmail()}>
                            Disconnect Gmail
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* === EMPTY STATE (connected but no threads) === */}
              <div id="email-empty-state" style={{display: 'none'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '80px 40px 60px'}}>
                  <div style={{width: '48px', height: '48px', background: 'var(--bg-grey-f5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px'}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-lighter)" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div style={{fontSize: '15px', fontWeight: '600', color: 'var(--text-default)', marginBottom: '8px'}}>No emails yet</div>
                  <div style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '340px'}}>Once your emails are synced, threads with Michael Fawler will appear here.</div>
                </div>
              </div>

              {/* === THREAD LIST === */}
              <div id="email-thread-list">
              <div className="email-inbox-list">

                {/* Thread 1: unread — Brand refresh timeline */}
                <div className="email-thread-row email-thread-unread">
                  <div className="email-thread-dot-col"><div className="email-thread-unread-dot"></div></div>
                  <div className="email-thread-avatar-col">
                    <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div>
                  </div>
                  <div className="email-thread-content">
                    <div className="email-thread-top">
                      <span className="email-thread-subject">RE: Brand refresh timeline</span>
                      <span className="email-thread-count">3</span>
                      <span className="email-thread-date">Jan 22</span>
                    </div>
                    <div className="email-thread-participants">Tom Bradley, Michael Fawler, Jessica Moore</div>
                    <div className="email-thread-preview">I've pushed the mood board review to Thursday to keep us on track for the Feb 14 deliverable. One question: do you want...</div>
                  </div>
                </div>

                {/* Thread 2: read — Q1 Retainer hours update */}
                <div className="email-thread-row">
                  <div className="email-thread-dot-col"></div>
                  <div className="email-thread-avatar-col">
                    <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/women/44.jpg\')'}}></div>
                  </div>
                  <div className="email-thread-content">
                    <div className="email-thread-top">
                      <span className="email-thread-subject">Q1 Retainer hours update</span>
                      <span className="email-thread-count">2</span>
                      <span className="email-thread-date">Jan 20</span>
                    </div>
                    <div className="email-thread-participants">Amanda Chen, Michael Fawler</div>
                    <div className="email-thread-preview">Quick heads up — we're at 34 of 40 hours for the month. The market positioning analysis took longer than scoped...</div>
                  </div>
                </div>

                {/* Thread 3: read — Sales deck feedback */}
                <div className="email-thread-row">
                  <div className="email-thread-dot-col"></div>
                  <div className="email-thread-avatar-col">
                    <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png\')'}}></div>
                  </div>
                  <div className="email-thread-content">
                    <div className="email-thread-top">
                      <span className="email-thread-subject">RE: RE: Sales deck feedback</span>
                      <span className="email-thread-count">4</span>
                      <span className="email-thread-date">Jan 18</span>
                    </div>
                    <div className="email-thread-participants">Michael Fawler, Tom Bradley, Priya Sharma</div>
                    <div className="email-thread-preview">The updated deck looks great. Priya had one note — can we swap the customer logos on slide 8? Two of them churned...</div>
                  </div>
                </div>

                {/* Thread 4: unread — Workshop prep */}
                <div className="email-thread-row email-thread-unread">
                  <div className="email-thread-dot-col"><div className="email-thread-unread-dot"></div></div>
                  <div className="email-thread-avatar-col">
                    <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/women/44.jpg\')'}}></div>
                  </div>
                  <div className="email-thread-content">
                    <div className="email-thread-top">
                      <span className="email-thread-subject">Workshop prep – stakeholder list</span>
                      <span className="email-thread-count">2</span>
                      <span className="email-thread-date">Jan 15</span>
                    </div>
                    <div className="email-thread-participants">Amanda Chen, Michael Fawler, Tom Bradley</div>
                    <div className="email-thread-preview">Attached is the pre-read for next week's positioning workshop. Michael, can you confirm who from the exec team...</div>
                  </div>
                </div>

                {/* Thread 5: read — Case study draft */}
                <div className="email-thread-row">
                  <div className="email-thread-dot-col"></div>
                  <div className="email-thread-avatar-col">
                    <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://ui-avatars.com/api/?name=MF&size=250&background=4c525a&color=ffffff&format=png\')'}}></div>
                  </div>
                  <div className="email-thread-content">
                    <div className="email-thread-top">
                      <span className="email-thread-subject">RE: Case study draft – Northvolt</span>
                      <span className="email-thread-count">2</span>
                      <span className="email-thread-date">Jan 12</span>
                    </div>
                    <div className="email-thread-participants">Michael Fawler, Amanda Chen</div>
                    <div className="email-thread-preview">Legal flagged one issue — we can't disclose the actual revenue numbers in section 3. Can you rework it to use...</div>
                  </div>
                </div>

              </div>{/* /email-inbox-list */}
              </div>{/* /email-thread-list */}
            </div>{/* /email-connected-state */}

          </div>{/* /tab-emails */}

        </div>

        {/* ====== RIGHT SIDEBAR ====== */}
        <div className="contact-sidebar">

          {/* Properties Section */}
          <div className="page-properties-section">
            <div className="page-properties-section-title page-properties-section-title--open">
              <div className="page-properties-section-title-toggle">
                Properties
                <svg className="page-properties-section-title-toggle-icon page-properties-section-title-toggle-icon--open" width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.5 6.65414L15.1113 0.120685C15.2745 -0.0434329 15.544 -0.0395254 15.711 0.1285L16.8723 1.29686C17.0393 1.46489 17.0431 1.73842 16.8799 1.90254L8.80742 9.8818C8.72392 9.96776 8.61006 10.0068 8.5 9.99902C8.38614 10.0029 8.27608 9.96385 8.19258 9.8818L0.120062 1.90254C-0.0431343 1.73842 -0.039339 1.46489 0.127652 1.29686L1.289 0.1285C1.45599 -0.0395254 1.72546 -0.0434329 1.88865 0.120685L8.5 6.65414Z" fill="#22AD01"></path></svg>
              </div>
              <a className="dashboard-chart-option-add-icon" href="/settings/custom_fields">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.4062 8.83333H11.6667V2.09375C11.6667 1.21354 10.9219 0.5 10 0.5C9.07812 0.5 8.33333 1.21354 8.33333 2.09375V8.83333H1.59375C0.713542 8.83333 0 9.57812 0 10.5C0 11.4219 0.713542 12.1667 1.59375 12.1667H8.33333V18.9062C8.33333 19.7865 9.07812 20.5 10 20.5C10.9219 20.5 11.6667 19.7865 11.6667 18.9062V12.1667H18.4062C19.2865 12.1667 20 11.4219 20 10.5C20 9.57812 19.2865 8.83333 18.4062 8.83333V8.83333Z" fill="#22AD01"></path></svg>
              </a>
            </div>
            <div>
              <div className="page-properties-section-item">
                <div className="page-properties-section-item-label">Job Title</div>
                <div className="page-properties-section-item-editable">
                  <div className="ghost-input-wrapper">
                    <input className="input-sm w100 ghost-form-control" name="job_title" placeholder="Add Job Title" type="text" value="Head of Operations" readOnly />
                  </div>
                </div>
              </div>
              <div className="page-properties-section-item">
                <div className="page-properties-section-item-label">Email</div>
                <div className="page-properties-section-item-editable">
                  <div className="ghost-input-wrapper">
                    <input className="input-sm w100 ghost-form-control" name="email" placeholder="Add Email" type="text" value="michael.fawler@techstart.co" readOnly />
                  </div>
                </div>
              </div>
              <div className="page-properties-section-item">
                <div className="page-properties-section-item-label">Phone Number</div>
                <div className="page-properties-section-item-editable">
                  <div className="ghost-input-wrapper">
                    <input className="input-sm w100 ghost-form-control" name="phone_number" placeholder="Add Phone Number" type="text" value="876-0768-5628" readOnly />
                  </div>
                </div>
              </div>
              <div className="page-properties-section-item">
                <div className="page-properties-section-item-label">Birthday</div>
                <div className="page-properties-section-item-editable">
                  <div className="ghost-input-wrapper">
                    <input className="input-sm w100 ghost-form-control" name="birthday" placeholder="Add Birthday" type="text" value="Mar 19, 1984" readOnly />
                  </div>
                </div>
              </div>
              <div className="page-properties-section-item">
                <div className="page-properties-section-item-label">Comments</div>
                <div className="page-properties-section-item-editable">
                  <div className="ghost-input-wrapper">
                    <input className="input-sm w100 ghost-form-control" name="comments" placeholder="Add comments" type="text" defaultValue="" />
                  </div>
                </div>
              </div>
              <div className="page-properties-section-item">
                <div className="page-properties-section-item-label">Mobile</div>
                <div className="page-properties-section-item-editable">
                  <div className="ghost-input-wrapper">
                    <input className="input-sm w100 ghost-form-control" name="mobile" placeholder="Add mobile" type="text" defaultValue="" />
                  </div>
                </div>
              </div>
              <div className="page-properties-section-item">
                <div className="page-properties-section-item-label">Region</div>
                <div className="page-properties-section-item-editable">
                  <div className="ghost-input-wrapper">
                    <input className="input-sm w100 ghost-form-control" name="region" placeholder="Add Region" type="text" value="Americas" readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Companies Section */}
          <div className="sidebar-section sidebar-section--open">
            <div className="sidebar-section-header">
              <div className="sidebar-section-title">
                Companies
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--text-muted-alt)" strokeWidth="1.5"><path d="M2 4l4 4 4-4"/></svg>
              </div>
              <button className="btn btn-ghost btn-icon" style={{width: '24px', height: '24px', padding: '0', color: 'var(--text-muted)'}}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
              </button>
            </div>
            <div className="company-card">
              <div className="company-card-avatar">T</div>
              <div>
                <div className="company-card-name">TechStart Labs</div>
                <div className="category-tag tag-xs" style={{marginTop: '4px'}}>
                  <div className="category-tag-label overflow-ellipsis">Primary</div>
                  <div className="category-tag-bg" style={{backgroundColor: 'var(--color-primary)'}}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ====== MEETING DETAIL PANEL ====== */}
        <div id="meeting-detail-panel" className="meeting-detail-panel">

          {/* Top bar */}
          <div className="mdp-top-bar">
            <div className="mdp-top-bar-title" id="mdp-title"></div>
            <div className="mdp-top-bar-right">
              <div className="mdp-top-bar-meta">
                <svg width="13" height="14" viewBox="0 0 20 22" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M7.00004 1.52433C7.00004 0.958562 6.55239 0.500004 6.00008 0.500004C5.44777 0.500004 4.99995 0.958562 4.99995 1.52433V2.04277C4.50409 2.05066 4.06343 2.06884 3.67522 2.11034C2.95585 2.18751 2.3036 2.35369 1.72352 2.76492C1.32776 3.04548 0.984741 3.39689 0.710837 3.80228C0.30938 4.39632 0.147173 5.06447 0.0720001 5.80137C0.0060378 6.44857 0.000513331 7.23846 1.18955e-05 8.18288V14.4017C-0.00015555 15.7888 -0.000155517 16.9326 0.118706 17.838C0.243431 18.7884 0.515475 19.6279 1.17155 20.2999C1.82762 20.972 2.64714 21.2507 3.57492 21.3784C4.45869 21.5002 5.57535 21.5 6.9294 21.5H13.0705C14.4247 21.5 15.5413 21.5002 16.4251 21.3784C17.3529 21.2506 18.1724 20.972 18.8285 20.2999C19.4845 19.6279 19.7566 18.7884 19.8813 17.838C20.0002 16.9327 20 15.7888 20 14.4017V8.18288C19.9995 7.23846 19.994 6.44857 19.928 5.80136C19.8528 5.06447 19.6906 4.39632 19.2892 3.80228C19.0153 3.39687 18.6721 3.04549 18.2765 2.76492C17.6964 2.35368 17.0442 2.18751 16.3248 2.11033C15.9366 2.06883 15.4959 2.05065 15.0001 2.04277V1.52432C15.0001 0.958558 14.5522 0.5 13.9999 0.5C13.4476 0.5 13 0.958558 13 1.52432V2.03657H6.99989L7.00004 1.52433ZM17.9999 8.18297H1.99991C2.00058 7.22362 2.00694 6.54502 2.06102 6.01442C2.11911 5.44457 2.22358 5.1633 2.35533 4.96814C2.49225 4.76563 2.66368 4.58985 2.86157 4.44957C3.0519 4.31461 3.32666 4.20777 3.88295 4.14809C4.19384 4.11482 4.5568 4.09921 4.99978 4.09184V4.59759C4.99978 5.16336 5.4476 5.62209 5.99991 5.62209C6.55222 5.62209 6.99987 5.16336 6.99987 4.59759V4.08552H12.9999V4.59759C12.9999 5.16336 13.4476 5.62209 13.9999 5.62209C14.5522 5.62209 15 5.16336 15 4.59759V4.09184C15.443 4.09921 15.806 4.11482 16.1169 4.14809C16.6732 4.20777 16.9479 4.31461 17.1382 4.44957C17.3361 4.58983 17.5075 4.76561 17.6445 4.96814C17.7762 5.16329 17.8805 5.44457 17.9388 6.01442C17.9929 6.54502 17.9992 7.22362 17.9999 8.18297ZM1.99983 10.2318H18.0001V14.3293C18.0001 15.807 17.9979 16.8121 17.8992 17.5648C17.8043 18.2882 17.6368 18.6231 17.4142 18.851C17.1917 19.0791 16.8647 19.2506 16.1586 19.3478C15.4238 19.449 14.4426 19.4512 13 19.4512H6.99993C5.55751 19.4512 4.57615 19.449 3.84136 19.3478C3.13519 19.2506 2.80824 19.0791 2.58558 18.851C2.36311 18.6231 2.1957 18.2882 2.10078 17.5648C2.002 16.8122 1.99983 15.807 1.99983 14.3293V10.2318Z" fill="#22AD01"/></svg>
                <span id="mdp-date"></span>
                <span className="mdp-top-bar-meta-sep">•</span>
                <span id="mdp-duration"></span>
              </div>
              <div className="mdp-dots-wrap">
                <button className="mdp-dots-btn" onClick={() => (window as any).toggleMdpMenu(event)}>
                  <svg width="14" height="4" viewBox="0 0 16 4" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.07086 4C0.925013 4 0 3.10843 0 2.00021C0 0.896154 0.925013 0.000411987 2.07086 0.000411987C3.22088 0.000411987 4.14589 0.896154 4.14589 2.00021C4.14589 3.10843 3.22088 4 2.07086 4Z" fill="currentColor"/><path fillRule="evenodd" clipRule="evenodd" d="M8 3.99959C6.85417 3.99959 5.92499 3.10802 5.92499 1.9998C5.92499 0.895742 6.85417 0 8 0C9.14587 0 10.0709 0.895742 10.0709 1.9998C10.0709 3.10802 9.14587 3.99959 8 3.99959Z" fill="currentColor"/><path fillRule="evenodd" clipRule="evenodd" d="M13.9249 3.99959C12.7791 3.99959 11.8499 3.10802 11.8499 1.9998C11.8499 0.895742 12.7749 0 13.9249 0C15.0708 0 16 0.895742 16 1.9998C16 3.10802 15.075 3.99959 13.9249 3.99959Z" fill="currentColor"/></svg>
                </button>
                <ul className="mdp-top-dropdown" id="mdp-top-dropdown">
                  <li><a>Copy Link</a></li>
                  <li><a>Delete</a></li>
                </ul>
              </div>
              <button className="mdp-close-btn" onClick={() => (window as any).closeMeetingPanel()}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="1" y1="1" x2="10" y2="10"/><line x1="10" y1="1" x2="1" y2="10"/></svg>
              </button>
            </div>
          </div>

          {/* Video player (shown only when recording exists) */}
          <div id="mdp-video-wrap" className="mdp-video-wrap" style={{display: 'none'}}>
            <video controls preload="metadata" className="mdp-video" id="mdp-video">
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Metadata bar: owner · invitees · visibility */}
          <div className="mdp-metadata-bar">
            <div className="mdp-meta-owner" id="mdp-owner-row">{/* filled by JS */}</div>
            <div className="mdp-invitees-stack" id="mdp-invitees-stack">{/* filled by JS */}</div>
            <button className="mdp-visibility-btn">
              <svg width="12" height="10" viewBox="0 0 18 13" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M9 0C5.14 0 1.84 2.37 0 5.83c0 .1.01.19.01.28C1.86 9.63 5.14 12 9 12s7.14-2.37 8.99-5.89c0-.09.01-.18.01-.28C16.16 2.37 12.86 0 9 0Zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-6.4a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z" fill="currentColor"/></svg>
              All Team Members
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Summary / Transcript tabs */}
          <div className="mdp-subnavigation">
            <div className="mdp-subnavigation-items">
              <a className="mdp-subnav-item active" onClick={(e) => (window as any).switchMdpTab('summary', e.currentTarget)}>Summary</a>
              <a className="mdp-subnav-item" onClick={(e) => (window as any).switchMdpTab('transcript', e.currentTarget)}>Transcript</a>
            </div>
          </div>

          {/* Summary tab */}
          <div className="mdp-tab-panel" id="mdp-tab-summary">
            <div className="mdp-summary-section">
              <h3 className="mdp-summary-section-title">Quick Recap</h3>
              <p className="mdp-recap-text" id="mdp-recap"></p>
            </div>
            <div className="mdp-summary-section" id="mdp-chapters-section">
              <h3 className="mdp-summary-section-title">Chapters</h3>
              <div className="mdp-chapters-list" id="mdp-chapters"></div>
            </div>
            <div className="mdp-summary-section" id="mdp-nextsteps-section">
              <h3 className="mdp-summary-section-title">Next Steps</h3>
              <div className="mdp-next-steps-list" id="mdp-nextsteps"></div>
            </div>
          </div>

          {/* Transcript tab */}
          <div className="mdp-tab-panel" id="mdp-tab-transcript" hidden>
            <div id="mdp-transcript"></div>
          </div>

        </div>

      </div>
    </div>

</div>

{/* ====== EMAIL DETAIL PANEL ====== */}
<div id="email-detail-panel" className="email-detail-panel">

  {/* Top bar: "View email" label + close */}
  <div className="edp-top-bar">
    <div className="edp-top-bar-icon">
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="12" height="9" rx="1.5"/><path d="M1 5l6 4 6-4"/></svg>
    </div>
    <div className="edp-top-bar-label">View email</div>
    <button className="edp-close-btn" onClick={() => (window as any).closeEmailPanel()}>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="1" y1="1" x2="10" y2="10"/><line x1="10" y1="1" x2="1" y2="10"/></svg>
    </button>
  </div>

  {/* Subject + Share button */}
  <div className="edp-subject-bar">
    <div className="edp-subject" id="edp-subject"></div>
    <button className="edp-share-btn" onClick={() => (window as any).toggleSharePopover(event)}>
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="2.5" r="1.5"/><circle cx="11" cy="11.5" r="1.5"/><circle cx="3" cy="7" r="1.5"/><line x1="4.5" y1="6.1" x2="9.5" y2="3.4"/><line x1="4.5" y1="7.9" x2="9.5" y2="10.6"/></svg>
      Share
    </button>
    {/* Share popover (same style as Manage Access popover) */}
    <div className="edp-share-popover email-access-popover" id="edp-share-popover" style={{display: 'none'}}>
      <div className="email-access-popover-title" id="edp-share-title">Email Access</div>
      <div className="email-access-workspace-row">
        <div className="workspace-avatar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><polygon points="8,2 14,14 2,14"/></svg>
        </div>
        <span className="workspace-name">Workspace Access</span>
        <div className="access-select" id="edp-share-access-toggle" onClick={() => (window as any).toggleShareAccessLevel()}>
          <span id="edp-share-access-label">Access</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l3 3 3-3"/></svg>
        </div>
      </div>
      <div className="email-access-popover-description" id="edp-share-description">Bodies and attachments of this email are visible to all workspace members.</div>
      <div className="email-access-search-row">
        <div className="form-group" style={{flex: '1', margin: '0'}}>
          <input type="text" className="form-field input-sm" placeholder="Search and add users"  />
        </div>
        <button className="btn btn-primary btn-smd">Grant access</button>
      </div>
      <div className="email-access-user-row">
        <div className="user-avatar avatar-xs" style={{backgroundImage: 'url(\'https://randomuser.me/api/portraits/men/32.jpg\')'}}></div>
        <span className="email-access-user-name">Tom Bradley <span style={{color: 'var(--text-muted)', fontWeight: '400'}}>(You)</span></span>
        <span className="email-access-user-status">Access</span>
      </div>
    </div>
  </div>

  {/* Scrollable area: email body + reply compose */}
  <div className="edp-body">

    {/* VIEW MODE: thread messages + comments + reply compose */}
    <div className="edp-view-mode" style={{flex: '1', overflowY: 'auto', display: 'flex', flexDirection: 'column'}}>

      {/* Thread messages (populated by JS) */}
      <div id="edp-body" className="edp-thread-list"></div>

      {/* Internal comments (rendered inline below thread) */}
      <div id="edp-comments-display" className="edp-comments-display"></div>
    </div>

    {/* COMPOSE MODE: To + Subject fields + compose body */}
    <div className="edp-compose-mode">
      <div style={{padding: '0 24px', flexShrink: '0'}}>
        <div className="edp-compose-field-row">
          <span className="edp-compose-field-label">To</span>
          <input className="edp-compose-input" id="edp-compose-to" placeholder="Add a recipient..." autoComplete="off" />
        </div>
        <div className="edp-compose-field-row">
          <span className="edp-compose-field-label">Subject</span>
          <input className="edp-compose-input" id="edp-compose-subject" placeholder="Subject" autoComplete="off" />
        </div>
      </div>
      <div className="edp-compose-body-area" style={{padding: '16px 24px 8px'}}>
        <div className="edp-compose-body-text" id="edp-compose-body"
             contentEditable="true"
             data-placeholder="Start typing your email, or create a template"></div>
      </div>
    </div>

  </div>

  {/* AI generating overlay (shown while AI drafts the email) */}
  <div id="edp-ai-overlay" className="edp-ai-overlay">
    <div className="edp-ai-spinner"></div>
    <span>Generating follow-up email with AI...</span>
    <a className="edp-ai-cancel-link" onClick={() => (window as any).cancelAI()}>Cancel</a>
  </div>

  {/* Tabbed compose area (always visible in view mode) */}
  <div className="edp-tabbed-compose" id="edp-tabbed-compose">
    {/* Tab headers */}
    <div className="edp-tc-tabs">
      <button className="edp-tc-tab edp-tc-tab--active" id="edp-tc-tab-reply" onClick={() => (window as any).switchComposeTab('reply')}>Reply</button>
      <button className="edp-tc-tab" id="edp-tc-tab-note" onClick={() => (window as any).switchComposeTab('note')}>Note</button>
      <button className="edp-tc-help" title="Learn more">?</button>
    </div>

    {/* Reply panel */}
    <div id="edp-tc-panel-reply" className="edp-tc-panel edp-tc-panel--active">
      <div className="edp-tc-compose" id="edp-reply-compose"
           contentEditable="true"
           data-placeholder="Reply to this email..."></div>
      <div className="edp-tc-toolbar">
        <div className="edp-rt-left">
          <button className="edp-rt-btn" data-tooltip="Attach file" style={{position: 'relative'}}>
            <svg width="16" height="15" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.08008 23.5H17.0801C19.5654 23.5 21.5801 21.4853 21.5801 19V6.01462C21.5801 4.88429 21.0342 3.82354 20.1144 3.16655L17.2939 1.15193C16.7003 0.727931 15.9891 0.5 15.2596 0.5H7.08008C4.5948 0.5 2.58008 2.51472 2.58008 5V19C2.58008 21.4853 4.5948 23.5 7.08008 23.5ZM5.08008 5C5.08008 3.89543 5.97551 3 7.08008 3H12.8301V5C12.8301 6.79493 14.2852 8.25 16.0801 8.25H19.0801V19C19.0801 20.1046 18.1846 21 17.0801 21H7.08008C5.97551 21 5.08008 20.1046 5.08008 19V5ZM19.0444 5.75C18.9843 5.53093 18.8505 5.33601 18.6613 5.20088L15.8409 3.18627C15.6904 3.07882 15.5136 3.01544 15.3301 3.00249V5C15.3301 5.41421 15.6659 5.75 16.0801 5.75H19.0444Z" fill="currentColor"/></svg>
          </button>
          <button className="edp-rt-btn" data-tooltip="Insert variable">
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.26688 0.000488281C5.67014 0.000488281 5.09785 0.237541 4.67589 0.659498C4.25393 1.08145 4.01688 1.65375 4.01688 2.25049V5.81192C4.01688 6.35963 3.73788 6.86877 3.27759 7.16449L2.24388 7.82663C2.10771 7.91387 1.99568 8.03396 1.91808 8.17584C1.84048 8.31772 1.7998 8.47684 1.7998 8.63856C1.7998 8.80028 1.84048 8.9594 1.91808 9.10128C1.99568 9.24316 2.10771 9.36325 2.24388 9.45049L3.27759 10.1126C3.73788 10.4083 4.01688 10.9188 4.01688 11.4665V15.0279C4.01688 16.2699 5.02488 17.2779 6.26688 17.2779H6.76317C7.01891 17.2779 7.26418 17.1763 7.44502 16.9955C7.62586 16.8146 7.72745 16.5694 7.72745 16.3136C7.72745 16.0579 7.62586 15.8126 7.44502 15.6318C7.26418 15.4509 7.01891 15.3493 6.76317 15.3493H6.26559C6.18035 15.3493 6.09859 15.3155 6.03831 15.2552C5.97803 15.1949 5.94417 15.1132 5.94417 15.0279V11.4665C5.94432 10.9177 5.81671 10.3764 5.57147 9.88545C5.32622 9.39451 4.97005 8.96739 4.53117 8.63792C4.9697 8.3087 5.32566 7.882 5.57089 7.39153C5.81612 6.90106 5.94392 6.36028 5.94417 5.81192V2.25049C5.94417 2.16524 5.97803 2.08348 6.03831 2.0232C6.09859 1.96292 6.18035 1.92906 6.26559 1.92906H6.76188C6.88851 1.92906 7.0139 1.90412 7.1309 1.85566C7.24789 1.8072 7.35419 1.73617 7.44373 1.64663C7.53328 1.55708 7.6043 1.45078 7.65276 1.33379C7.70122 1.2168 7.72617 1.09141 7.72617 0.964774C7.72617 0.838142 7.70122 0.71275 7.65276 0.595758C7.6043 0.478765 7.53328 0.372463 7.44373 0.282921C7.35419 0.193379 7.24789 0.12235 7.1309 0.0738901C7.0139 0.0254303 6.88851 0.000488279 6.76188 0.000488281H6.26688ZM11.2297 0.000488281C12.473 0.000488281 13.4797 1.00849 13.4797 2.25049V5.81192C13.4797 6.35963 13.76 6.86877 14.2203 7.16449L15.254 7.82663C15.3902 7.91387 15.5022 8.03396 15.5798 8.17584C15.6574 8.31772 15.6981 8.47684 15.6981 8.63856C15.6981 8.80028 15.6574 8.9594 15.5798 9.10128C15.5022 9.24316 15.3902 9.36325 15.254 9.45049L14.2203 10.1126C13.9934 10.2582 13.8068 10.4585 13.6776 10.6951C13.5484 10.9317 13.4808 11.1969 13.481 11.4665V15.0279C13.481 15.6247 13.244 16.1969 12.822 16.6189C12.4001 17.0409 11.8278 17.2779 11.231 17.2779H10.7347C10.479 17.2779 10.2337 17.1763 10.0529 16.9955C9.87205 16.8146 9.77045 16.5694 9.77045 16.3136C9.77045 16.0579 9.87205 15.8126 10.0529 15.6318C10.2337 15.4509 10.479 15.3493 10.7347 15.3493H11.231C11.3163 15.3493 11.398 15.3155 11.4583 15.2552C11.5186 15.1949 11.5525 15.1132 11.5525 15.0279V11.4665C11.5525 10.3479 12.0796 9.30392 12.9642 8.63792C12.5259 8.30857 12.1702 7.8818 11.9252 7.39134C11.6801 6.90088 11.5526 6.36017 11.5525 5.81192V2.25049C11.5525 2.16524 11.5186 2.08348 11.4583 2.0232C11.398 1.96292 11.3163 1.92906 11.231 1.92906H10.7347C10.479 1.92906 10.2337 1.82747 10.0529 1.64663C9.87205 1.46579 9.77045 1.22052 9.77045 0.964774C9.77045 0.70903 9.87205 0.46376 10.0529 0.282921C10.2337 0.102082 10.479 0.000488285 10.7347 0.000488281H11.2297Z" fill="currentColor"/></svg>
          </button>
          <button className="edp-rt-btn" data-tooltip="Email signature">
            <svg width="17" height="10" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.4809 4.00029C17.8616 4.10966 15.5515 5.7096 14.3823 6.23459C13.4726 6.64395 12.688 6.99706 12.0033 6.99706C11.2968 6.99706 11.1906 6.49083 11.3375 5.37524C11.3719 5.12525 11.7032 2.90033 10.0026 2.9972C9.21799 3.04408 7.99257 3.77217 4.70392 6.93456L6.00125 3.69405C6.95158 1.32226 4.33817 -1.04015 1.94671 0.48167L0.230482 1.63475C-0.000848232 1.78162 -0.0696222 2.09099 0.077304 2.32535L0.614992 3.16907C0.761918 3.40344 1.0714 3.47219 1.30586 3.32219L3.11899 2.10661C3.69419 1.741 4.39131 2.3316 4.14122 2.95345L1.0714 10.6282C0.858827 11.1563 1.15581 12 1.99985 12C2.25932 12 2.51565 11.9 2.70635 11.7063C4.02556 10.3876 7.54241 6.99706 9.30865 5.58773C9.23988 6.47833 9.243 7.42829 9.95262 8.20639C10.4309 8.73137 11.1187 8.99698 12.0002 8.99698C13.1131 8.99698 14.126 8.54075 15.1982 8.05952C16.2298 7.59703 18.293 6.10334 19.5247 6.00334C19.7904 5.98147 19.9999 5.77523 19.9999 5.50961V4.50652C20.0061 4.22216 19.7654 3.98154 19.4809 4.00029Z" fill="currentColor"/></svg>
          </button>
          <button className="edp-rt-btn" data-tooltip="Email templates">
            <svg width="16" height="18" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M19.6917 0.75C21.9979 0.75 23.9818 1.51185 25.3877 2.96294C26.789 4.40919 27.5 6.41967 27.5 8.70385V22.0854C27.5 24.3589 26.7941 26.3603 25.4044 27.8042C24.0101 29.2529 22.042 30.0207 19.7532 30.0348L19.7455 30.0349L8.55788 30.0392C6.25159 30.0392 4.26702 29.2774 2.8614 27.8261C1.46052 26.3798 0.75 24.3694 0.75 22.0854V8.70385C0.75 6.43056 1.45539 4.4294 2.84482 2.98577C4.23889 1.53732 6.20672 0.769941 8.49535 0.755844L8.50305 0.755797L19.6917 0.75ZM19.6917 3.25C21.4363 3.25007 22.7319 3.81457 23.5923 4.70257C24.4574 5.59547 25 6.93692 25 8.70385V22.0854C25 23.8426 24.4617 25.1786 23.6032 26.0706C22.7499 26.9572 21.4668 27.5235 19.7411 27.5349H8.55691C6.81208 27.5392 5.51718 26.9747 4.65715 26.0868C3.79236 25.194 3.25 23.8525 3.25 22.0854V8.70385C3.25 6.9464 3.78804 5.61091 4.64608 4.7194C5.49892 3.83328 6.7815 3.26717 8.50737 3.25582L19.6917 3.25ZM7.65625 9.43656C7.65625 8.7462 8.21589 8.18656 8.90625 8.18656H12.9152C13.6055 8.18656 14.1652 8.7462 14.1652 9.43656C14.1652 10.1269 13.6055 10.6866 12.9152 10.6866H8.90625C8.21589 10.6866 7.65625 10.1269 7.65625 9.43656ZM7.65625 15.5137C7.65625 14.8233 8.21589 14.2637 8.90625 14.2637H19.4124C20.1028 14.2637 20.6624 14.8233 20.6624 15.5137C20.6624 16.204 20.1028 16.7637 19.4124 16.7637H8.90625C8.21589 16.7637 7.65625 16.204 7.65625 15.5137ZM7.65625 21.6065C7.65625 20.9161 8.21589 20.3565 8.90625 20.3565H19.4124C20.1028 20.3565 20.6624 20.9161 20.6624 21.6065C20.6624 22.2968 20.1028 22.8565 19.4124 22.8565H8.90625C8.21589 22.8565 7.65625 22.2968 7.65625 21.6065Z" fill="currentColor"/></svg>
          </button>
        </div>
        <div className="edp-rt-right">
          <button className="edp-rt-btn edp-rt-discard" data-tooltip="Discard draft" onClick={() => (window as any).clearReply()}>
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3.5h11"/><path d="M4.5 3.5V2h4v1.5"/><rect x="2" y="3.5" width="9" height="9" rx="1"/><path d="M5 6.5v3.5"/><path d="M8 6.5v3.5"/></svg>
          </button>
          <button className="edp-rt-ai-btn" id="edp-tc-ai-btn" onClick={() => (window as any).generateWithAI()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 12.8 6.5 14.5 8.5C16.2 10.5 21 11 21 11C21 11 16.2 11.8 14.5 13.5C12.8 15.2 12 20 12 20C12 20 11.2 15.2 9.5 13.5C7.8 11.8 3 11 3 11C3 11 7.8 10.5 9.5 8.5C11.2 6.5 12 2 12 2Z" fill="white" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 2C19 2 19.4 4 20 4.5C20.6 5 22 5 22 5C22 5 20.6 5.2 20 5.8C19.4 6.4 19 8 19 8C19 8 18.6 6.4 18 5.8C17.4 5.2 16 5 16 5C16 5 17.4 5 18 4.5C18.6 4 19 2 19 2Z" fill="white" stroke="white" strokeWidth="0.3"/>
            </svg>
            <span className="edp-rt-ai-tooltip">Generate a follow-up email with AI</span>
          </button>
          <button className="edp-rt-send" style={{background: '#22AD01'}}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1L1 5l4.5 2L8 12l4-11z"/><path d="M5.5 7L12 1"/></svg>
            Send email
          </button>
        </div>
      </div>
    </div>

    {/* Note panel */}
    <div id="edp-tc-panel-note" className="edp-tc-panel edp-tc-panel--note">
      <div className="edp-tc-compose" id="edp-note-compose"
           contentEditable="true"
           data-placeholder="Add an internal note (@mention a teammate)..."></div>
      <div className="edp-tc-toolbar">
        <div className="edp-rt-left">
          <button className="edp-rt-btn" data-tooltip="Bold" style={{fontWeight: '700', fontSize: '13px'}}>B</button>
          <button className="edp-rt-btn" data-tooltip="Italic" style={{fontStyle: 'italic', fontSize: '13px'}}>i</button>
          <button className="edp-rt-btn" data-tooltip="Mention teammate" style={{fontSize: '13px', fontWeight: '500'}}>@</button>
        </div>
        <div className="edp-rt-right">
          <button className="edp-tc-note-send" onClick={() => (window as any).submitNoteFromTab()}>Add note</button>
        </div>
      </div>
    </div>
  </div>

</div>

{/* ===== MODAL: Email Integration Settings ===== */}
<div className="modal-overlay hidden" id="modal-integration">
  <div className="modal-wrap">
    <div className="modal-dialog">

      {/* Header: provider icon + name + connected status */}
      <div className="integ-modal-header">
        <div id="integ-modal-icon" style={{flexShrink: '0'}}></div>
        <div className="integ-modal-provider-info">
          <div className="integ-modal-provider-name">
            <span id="integ-modal-name"></span>
            <span className="integ-modal-connected-badge">
              <span className="integ-modal-connected-dot"></span> Connected
            </span>
          </div>
          <div className="integ-modal-email-addr">tom.bradley@catalystconsulting.io</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="integ-modal-tabs">
        <div className="integ-modal-tab active" onClick={() => (window as any).switchIntegTab('general')}>General</div>
        <div className="integ-modal-tab" onClick={() => (window as any).switchIntegTab('blocklist')}>Blocklist</div>
      </div>

      {/* Tab body */}
      <div className="integ-modal-body">

        {/* General tab */}
        <div className="integ-tab-panel active" id="integ-tab-general">
          {/* Default sharing */}
          <div className="sharing-section">
            <div className="sharing-section-title">Default sharing</div>
            <div className="sharing-section-desc">Control what information is visible to others in your workspace.</div>
            <div className="sharing-option" onClick={(e) => (window as any).selectSharingOption(e.currentTarget)}>
              <div className="sharing-option-icon">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="16" height="11" rx="1.5"/><path d="M1 6l8 5 8-5"/></svg>
              </div>
              <div className="sharing-option-body">
                <div className="sharing-option-title">Metadata only</div>
                <div className="sharing-option-desc">The email participants and timestamp will be visible to anyone in your workspace</div>
              </div>
              <div className="sharing-option-radio"></div>
            </div>
            <div className="sharing-option selected" onClick={(e) => (window as any).selectSharingOption(e.currentTarget)}>
              <div className="sharing-option-icon">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="16" height="11" rx="1.5"/><path d="M1 6l8 5 8-5"/></svg>
              </div>
              <div className="sharing-option-body">
                <div className="sharing-option-title">Subject line and metadata</div>
                <div className="sharing-option-desc">We'll share the subject, participants and timestamp with anyone in your workspace</div>
              </div>
              <div className="sharing-option-radio"></div>
            </div>
            <div className="sharing-option" onClick={(e) => (window as any).selectSharingOption(e.currentTarget)}>
              <div className="sharing-option-icon">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="16" height="11" rx="1.5"/><path d="M1 6l8 5 8-5"/></svg>
              </div>
              <div className="sharing-option-body">
                <div className="sharing-option-title">Full access</div>
                <div className="sharing-option-desc">Everything is shared with your workspace (including the body, subject line, attachments)</div>
              </div>
              <div className="sharing-option-radio"></div>
            </div>
          </div>

          {/* Individual sharing */}
          <div className="sharing-section">
            <div className="individual-sharing-row">
              <div className="individual-sharing-info">
                <div className="sharing-section-title">Individual sharing</div>
                <div className="sharing-section-desc" style={{marginBottom: '0'}}>Share full access to your emails with specific individuals</div>
              </div>
              <button className="btn btn-default btn-smd" style={{flexShrink: '0'}}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{marginRight: '5px'}}><circle cx="7" cy="5" r="3"/><path d="M1 13c0-3.31 2.69-6 6-6s6 2.69 6 6"/></svg>
                Share access
              </button>
            </div>
          </div>
        </div>

        {/* Blocklist tab */}
        <div className="integ-tab-panel" id="integ-tab-blocklist">
          <div className="blocklist-empty">
            <div className="blocklist-empty-icon">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17" cy="14" r="7" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M3 38c0-7.732 6.268-14 14-14h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="32" cy="32" r="9" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M26 38l12-12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="blocklist-empty-title">No emails or domains yet</div>
            <div className="blocklist-empty-desc">Emails from blocklisted domains and addresses won't appear in Bonsai</div>
            <button className="btn btn-primary btn-smd">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" style={{marginRight: '5px'}}><line x1="6" y1="1" x2="6" y2="11"/><line x1="1" y1="6" x2="11" y2="6"/></svg>
              Add to blocklist
            </button>
          </div>
        </div>

      </div>{/* /integ-modal-body */}

      {/* Footer */}
      <div className="modal-footer">
        <button className="btn btn-default btn-smd" onClick={() => (window as any).closeIntegModal()}>Cancel</button>
        <button className="btn btn-primary btn-smd" onClick={() => (window as any).saveIntegrationSettings()}>Save &amp; Continue</button>
      </div>

    </div>{/* /modal-dialog */}
    <button className="modal-close-btn" onClick={() => (window as any).closeIntegModal()}>&#x2715;</button>
  </div>
</div>

{/* ===== MODAL: Connect Gmail (POC — replaces complex integration modal) ===== */}
<div className="modal-overlay hidden" id="modal-connect-gmail">
  <div className="modal-wrap">
    <div className="modal-dialog modal-dialog-sm">
      <div className="import-modal-inner">
        <div className="import-modal-logo">
          {/* Gmail M icon */}
          <svg width="38" height="28" viewBox="0 0 46 34" fill="none">
            <path d="M0 4v26a4 4 0 004 4h8V15.5L0 4z" fill="#EA4335"/>
            <path d="M46 4v26a4 4 0 01-4 4h-8V15.5L46 4z" fill="#4285F4"/>
            <path d="M12 34V15.5L23 24l11-8.5V34H12z" fill="#FBBC05"/>
            <path d="M0 4C0 1.8 1.8 0 4 0h38c2.2 0 4 1.8 4 4L23 18.5 0 4z" fill="#34A853"/>
          </svg>
        </div>
        <div className="import-modal-title">Gmail</div>
        <div className="import-modal-subtitle">Bring the emails you send and receive into your individual Gmail account into Bonsai.</div>
        <div style={{marginBottom: '22px'}}>
          <div style={{display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-default)', marginBottom: '10px', lineHeight: '1.45'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22AD01" strokeWidth="2.5" style={{flexShrink: '0', marginTop: '1px'}}><polyline points="20 6 9 17 4 12"/></svg>
            Sync past email threads to your contacts in Bonsai
          </div>
          <div style={{display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-default)', marginBottom: '10px', lineHeight: '1.45'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22AD01" strokeWidth="2.5" style={{flexShrink: '0', marginTop: '1px'}}><polyline points="20 6 9 17 4 12"/></svg>
            View full email conversations directly on the contact profile
          </div>
          <div style={{display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-default)', lineHeight: '1.45'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22AD01" strokeWidth="2.5" style={{flexShrink: '0', marginTop: '1px'}}><polyline points="20 6 9 17 4 12"/></svg>
            Keep your client communication history in one place
          </div>
        </div>
        <button className="btn btn-primary btn-smd import-modal-cta" onClick={() => (window as any).proceedToOAuth()}>Continue</button>
      </div>
    </div>
    <button className="modal-close-btn" onClick={() => (window as any).closeConnectGmailModal()}>&#x2715;</button>
  </div>
</div>

{/* ===== MODAL: Import Past Emails ===== */}
<div className="modal-overlay hidden" id="modal-import">
  <div className="modal-wrap">
    <div className="modal-dialog modal-dialog-sm">
      <div className="import-modal-inner">
        <div className="import-modal-logo" id="import-modal-logo"></div>
        <div className="import-modal-title">Do you want to import past emails?</div>
        <div className="import-modal-subtitle">Import emails from the following dates:</div>
        <div className="import-date-row">
          <div className="import-date-field">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#22AD01" strokeWidth="1.5"><rect x="1" y="2" width="12" height="11" rx="1.5"/><line x1="1" y1="5" x2="13" y2="5"/><line x1="4" y1="1" x2="4" y2="3"/><line x1="10" y1="1" x2="10" y2="3"/></svg>
            <span>24/12/2025</span>
          </div>
          <span className="import-date-arrow">&#8594;</span>
          <div className="import-date-field">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#22AD01" strokeWidth="1.5"><rect x="1" y="2" width="12" height="11" rx="1.5"/><line x1="1" y1="5" x2="13" y2="5"/><line x1="4" y1="1" x2="4" y2="3"/><line x1="10" y1="1" x2="10" y2="3"/></svg>
            <span>24/01/2026</span>
          </div>
        </div>
        <button className="btn btn-primary btn-smd import-modal-cta" onClick={() => (window as any).finishImport()}>Import Emails</button>
        <div className="import-modal-skip" onClick={() => (window as any).skipImport()}>Maybe Later</div>
      </div>
    </div>
    <button className="modal-close-btn" onClick={() => (window as any).skipImport()}>&#x2715;</button>
  </div>
</div>

{/* ── Delete Note Modal ── */}
<div id="delete-note-modal" className="modal-overlay hidden delete-note-modal">
  <div className="modal-wrap">
    <div className="modal-dialog">
      <div className="delete-note-modal-title">Delete Note</div>
      <div className="delete-note-modal-desc">Confirm that you would like to permanently delete this note.</div>
      <button className="btn-danger" onClick={() => (window as any).confirmDeleteNote()}>Delete</button>
    </div>
    <button className="modal-close-btn" onClick={() => (window as any).closeDeleteModal()}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l12 12M13 1L1 13"/></svg>
    </button>
  </div>
</div>



{/* ── Toast notification ── */}
<div id="toast-notification">
  <span className="toast-dot"></span>
  <span className="toast-msg"></span>
  <button className="toast-close" onClick={() => (window as any).closeToast()}>&#x2715;</button>
</div>


    </>
  );
}
