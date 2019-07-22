import React from 'react';

const Contact = () => {
  return (
    <div className='contact'>
      <div className='content'>
        <h1>Contact Us</h1>
        <p className='lead'>We'd love to hear from you</p>

        <form method='POST' action='contact' className='contact-form'>
          <p className='label'>Name</p>
          <input name='name' type='text' />
          <p className='label'>E-mail</p>
          <input name='email' type='text' />
          <p className='label'>Message</p>
          <textarea name='message' cols='30' rows='10' />
          <button className='btn btn-action' type='submit'>
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
