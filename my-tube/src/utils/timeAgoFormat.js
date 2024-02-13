import React from 'react'

export default function TimeAgoFormat({date}) {
    const publishedDate = new Date(date);
    const seconds = Math.floor((new Date() - publishedDate) / 1000);
    let interval = seconds / 31536000; // 365 * 24 * 60 * 60
  
    if (interval > 1) {
      return Math.floor(interval) + ' years ago';
    } else if (interval > 0.8) {
      return '1 year ago';
    }
  
    interval = seconds / 2592000; // 30 * 24 * 60 * 60
    if (interval > 1) {
      return Math.floor(interval) + ' months ago';
    } else if (interval > 0.8) {
      return '1 month ago';
    }
  
    interval = seconds / 604800; // 7 * 24 * 60 * 60
    if (interval > 1) {
      return Math.floor(interval) + ' weeks ago';
    } else if (interval > 0.8) {
      return '1 week ago';
    }
  
    interval = seconds / 86400; // 24 * 60 * 60
    if (interval > 1) {
      return Math.floor(interval) + ' days ago';
    } else if (interval > 0.8) {
      return '1 day ago';
    }
  
    interval = seconds / 3600; // 60 * 60
    if (interval > 1) {
      return Math.floor(interval) + ' hours ago';
    } else if (interval > 0.8) {
      return '1 hour ago';
    }
  
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes ago';
    } else if (interval > 0.8) {
      return '1 minute ago';
    }
  
    return 'just now';
  }