console.log('email-service run');
// console.log('makeId', utilService.makeId());

import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/local-storage-service.js'


export const emailService = {
    getEmails,
    getEmailById,
    deleteEmailById,
    markAsRead,
    getEmptyEmail,
    add,
    getUnreadCount,
    toggleStar
}
const STORAGE_KEY = 'emailDB';
var gEmails = [];

function getEmails() {
    return _createEmails()
        .then(emails => {
            gEmails = emails;
            console.log('getEmails.then');
            return Promise.resolve(emails);
        })
        .catch(err => {
            console.log('default emails', err);
        });
}

function getEmailById(emailId) {
    const rEmail = gEmails.find(email => email.id === emailId);
    return Promise.resolve(rEmail);
}

function _createEmails() {
    let emails = storageService.loadFromStorage(STORAGE_KEY);
    if (emails) {
        return Promise.resolve(emails);
    } else {
        emails = [];
        emails.push(_createEmail('Mor', 'Where to Drink Beer Right Now', 'Humans have a natural desire for closure– '));
        emails.push(_createEmail('Neta', 'As You Wish', 'we don’t like having gaps in our knowledge.'));
        emails.push(_createEmail('Matan', 'NEW! Vacation on Mars', 'You can leverage this desire for closure by leaving '));
        emails.push(_createEmail('Jill', 'Mary, do you remember me', 'You can make subscribers curious by asking a question,'));
        emails.push(_createEmail('Simon', 'I love you', 'Being humorous requires a bit more thought and creativity, '));
        emails.push(_createEmail('Paul', 'Seriously, Who DOES This?', 'Everyone has a bit of vanity. '));
        emails.push(_createEmail('David', 'Thanks for helping us', 'That’s why some of the most clever subject lines'));
        emails.push(_createEmail('Shlomo', 'I’m deleting your Envira account', 'To do this, you can either promise something '));
        emails.push(_createEmail('Aviva', '*Don’t Open This Email*', 'Here are some great examples of clever email'));
        gEmails = emails;
        storageService.storeToStorage(STORAGE_KEY, emails);
        return Promise.resolve(emails);
    }
}

function _createEmail(sendTo = '', subject = '', body = '') {

    const email = {
        id: utilService.makeId(),
        sentBy: 'Noam',
        sendTo: sendTo,
        subject: subject,
        body: body,
        isRead: false,
        sentAt: getTime(),
        draft: false,
        isStar: false,
    }
    return email;
}

function getTime() {
    const now = new Date();
    let currTime = now.getHours() + ":" + now.getMinutes();
    return currTime
}

function getUnreadCount() {
    return gEmails.filter(email => !email.isRead).length;
}


function getEmptyEmail() {
    return { id: utilService.makeId(), sentBy: 'Noam', sendTo: '', subject: '', body: '', isRead: false, sentAt: getTime(), draft: false }
}

function toggleStar(emailId) {
    const emailIdx = gEmails.findIndex(email => email.id === emailId);
    gEmails[emailIdx].isStar = !gEmails[emailIdx].isStar;
    storageService.storeToStorage(STORAGE_KEY, gEmails);
}

function add(newEmail) {
    gEmails.unshift(newEmail);
    storageService.storeToStorage(STORAGE_KEY, gEmails);
}

function deleteEmailById(emailId) {
    console.log('deletedEmail')
    const emailIdx = gEmails.findIndex(email => email.id === emailId);
    console.log('emailIdx', emailIdx);
    gEmails.splice(emailIdx, 1);
    storageService.storeToStorage(STORAGE_KEY, gEmails);
    return Promise.resolve(`Email with Id ${emailId} deleted`);
}

function markAsRead(emailId) {
    const emailIdx = gEmails.findIndex(email => email.id === emailId);
    gEmails[emailIdx].isRead = true;
    storageService.storeToStorage(STORAGE_KEY, gEmails);
    return Promise.resolve(`Email with Id ${emailId} marked as read`);
}
