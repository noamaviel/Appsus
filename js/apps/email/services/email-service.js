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
    getUnreadCount
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
        emails.push(_createEmail('First default email'));
        emails.push(_createEmail('Second default email'));
        emails.push(_createEmail('Third default email'));
        emails.push(_createEmail('First default email'));
        emails.push(_createEmail('Second default email'));
        emails.push(_createEmail('Third default email'));
        emails.push(_createEmail('First default email'));
        emails.push(_createEmail('Second default email'));
        emails.push(_createEmail('Third default email'));
        gEmails = emails;
        storageService.storeToStorage(STORAGE_KEY, emails);
        return Promise.resolve(emails);
    }
}

function _createEmail(subject = '') {

    const email = {
        id: utilService.makeId(),
        sentBy: 'Noam',
        sendTo: 'David',
        subject: subject,
        body: 'Email body text',
        isRead: false,
        sentAt: getTime(),
        draft: false
    }
    return email;
}

function getTime() {
    const now = new Date();
    let currTime = now.getHours() + ":" + now.getMinutes()
    return currTime
}

function getUnreadCount() {
    return gEmails.filter(email => !email.isRead).length;
}


function getEmptyEmail() {
    return { id: utilService.makeId(), sentBy: 'Noam', sendTo: '', subject: '', body: '', isRead: false, sentAt: getTime(), draft: false }
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
