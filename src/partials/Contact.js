/* eslint no-alert: 0 */
/* eslint no-console: 0 */

import css from 'styled-components';
import React from 'react';
import { shape, string } from 'prop-types';

import { breakpoint, color, setSpace, setType, styleText } from '../utils';

import Button from '../components/Button';
import Container from '../components/Container';
import Field from '../components/Field';
import Section from '../components/Section';
import Separator from '../components/Separator';

const ContactEl = css.div`
  background-color: ${color.white};
  background-image: url(${({ cover }) => cover});
  background-position: center center;
  background-size: cover;
`;

const ContactTitle = css.h1`
  ${styleText.t1};
  color: ${color.philGreen};
`;
const ContactText = css.p`
  ${styleText.t5};
`;
const ContactBody = css.div`
  ${breakpoint.tablet} {
    display: flex;
  }
`;
const ContactForm = css.form`
  ${breakpoint.onlyphone} {
    ${setSpace('mbl')};
    text-align: center;
  }
  ${breakpoint.tablet} {
    flex-basis: ${100 / 3 * 2}%;
  }
`;
const ContactDetails = css.address`
  text-align: center;
  ${breakpoint.tablet} {
    flex-basis: ${100 / 3}%;
  }
  i.fa {
    ${setType('m')};
    color: ${color.blackLt};
  }
`;
const ContactDetail = css.span`
  ${setSpace('mbm')};
  ${styleText.t6};
  display: block;
`;

const Copyright = css.div`
  color: ${color.blackLLt};
  display: flex;
  justify-content: space-between;
`;

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contactForm', ...this.state })
    })
      .then(() => alert('Email sent!'))
      .catch((error) => alert(error));
    e.preventDefault();
  }
  render() {
    return (
      <ContactEl cover={this.props.data.background.source_url}>
        <Section valign="center">
          <Container space>
            <ContactTitle>{this.props.data.title}</ContactTitle>
            <Separator silent size="m" />
            <ContactText>{this.props.data.intro}</ContactText>
            <Separator silent size="m" />
            <ContactBody>
              <ContactForm
                action="/"
                data-netlify-honeypot="bot-field"
                data-netlify
                method="post"
                name="contactForm"
                onSubmit={this.handleSubmit}
              >
                <p hidden>
                  Don’t fill this out: <input name="bot-field" />
                </p>
                <Field
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Your Name"
                />
                <Separator silent size="m" />
                <Field
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Your email address"
                  type="email"
                />
                <Separator silent size="m" />
                <Field
                  name="subject"
                  onChange={this.handleChange}
                  placeholder="Subject"
                />
                <Separator silent size="m" />
                <Field
                  name="message"
                  onChange={this.handleChange}
                  placeholder="Your message"
                  type="textarea"
                />
                <Separator silent size="m" />
                <Button type="submit">Send</Button>
              </ContactForm>
              <ContactDetails>
                <i className="fa fa-map-marker" />
                <ContactDetail>{this.props.data.location}</ContactDetail>
                <i className="fa fa-phone" />
                <ContactDetail>{this.props.data.phone}</ContactDetail>
                <i className="fa fa-envelope" />
                <ContactDetail>
                  <a href={`mailto:${this.props.data.email}`}>
                    {this.props.data.email}
                  </a>
                </ContactDetail>
              </ContactDetails>
            </ContactBody>
            <Separator size="l" />
            <Copyright>
              <span>&copy; Phil McMaster</span>
              <span>
                Site:{' '}
                <a
                  href="https://netprophets.com.au"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  NetProphets
                </a>
              </span>
            </Copyright>
          </Container>
        </Section>
      </ContactEl>
    );
  }
}

Contact.propTypes = {
  data: shape({
    background: shape({
      source_url: string
    }),
    email: string.isRequired,
    location: string.isRequired,
    phone: string.isRequired,
    title: string.isRequired
  }).isRequired
};
