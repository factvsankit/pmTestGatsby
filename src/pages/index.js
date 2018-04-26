import css from 'styled-components';
import React, { Component } from 'react';
import { Element, scroller } from 'react-scroll';
import { filter, throttle } from 'lodash';
import { shape, object } from 'prop-types';

import { breakpoint, color, setSpace, styleText, time } from '../utils';
import {
  Container,
  CopyBlock,
  Section,
  Separator,
  Slideshow
} from '../components';
import { Bio, Contact, Cover, Init, Offcanvas, Topbar } from '../partials';

const NewSection = css.div`
  background-color: ${color.blackBlk};
  background-image: url(${({ cover }) => cover});
  background-position: center center;
  background-size: cover;
  color: ${color.white};
`;

const SectionTitle = css.h1`
  ${styleText.t1};
  color: ${color.philGreen};
`;

const SectionIntro = css.p`
  ${styleText.t5};
`;

const SectionAction = css.a`
  ${styleText.t5};
  border-bottom: 1px solid ${color.philGreen};
  color: ${color.philGreen};
  cursor: pointer;
  font-weight: bold;
  transition: color ${time.m}, border-color ${time.m};
  &:hover {
    color: ${color.philGreenDark};
    border-color: ${color.philGreenDark};
  }
`;

const SectionBody = css.div`
  ${breakpoint.onlyphone} {
    & > *:first-child {
      ${setSpace('mbl')};
    }
  }
  ${breakpoint.tablet} {
    display: flex;
    flex-direction: row;
    > * {
      flex-basis: 50%;
      &:first-child {
        ${setSpace('prl')};
      }
      &:last-child {
        ${setSpace('pll')};
      }
    }
  }
`;

const SectionBlock = css.div`
  ul {
    color: ${color.whiteD};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  ul > li {
    ${setSpace('mts')};
    flex: 0 0 50%;
  }
`;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offcanvas: false,
      slideshow: null,
      stickynav: false
    };

    /* get data */
    const { data } = this.props;
    this.wpmeta = data.wpmeta.edges[0].node.acf;
    this.wpdata = data.wpdata.edges[0].node.acf.content_page;

    /* split data — somewhat hacky */
    this.filteredBio = filter(this.wpdata, {
      __typename: 'WordPressAcf_biography'
    });
    this.filteredContact = filter(this.wpdata, {
      __typename: 'WordPressAcf_contact'
    });
    this.filteredSections = filter(this.wpdata, {
      __typename: 'WordPressAcf_section'
    });
    this.filteredCover = filter(this.wpdata, {
      __typename: 'WordPressAcf_cover'
    });
    this.wpBio = this.filteredBio[0]; /* eslint prefer-destructuring: 0 */
    this.wpCarousel = this.filteredCover[0].carousel;
    this.wpContact = this.filteredContact[0]; /* eslint prefer-destructuring: 0 */
    this.wpSections = this.filteredSections;

    /* get section slugs */
    const slugs = [];
    this.filteredSections.map((section) => {
      const slug = {
        title: section.title,
        slug: section.title.trim().toLowerCase()
      };
      return slugs.push(slug);
    });
    this.slugs = slugs;

    /* bind handlers */
    this.cropBody = this.cropBody.bind(this);
    this.handlePageScroll = this.handlePageScroll.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.toggleOffcanvas = this.toggleOffcanvas.bind(this);
    this.toggleSlideshow = this.toggleSlideshow.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handlePageScroll, 350));
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlePageScroll);
  }
  handlePageScroll() {
    this.setState({ stickynav: window.pageYOffset > window.innerHeight });
  }
  navigateTo(target) {
    scroller.scrollTo(target, {
      duration: 1500,
      delay: 0,
      smooth: true
    });
    return this.state.offcanvas ? this.toggleOffcanvas() : null;
  }
  toggleOffcanvas() {
    this.setState({ offcanvas: !this.state.offcanvas });
    this.cropBody();
  }
  cropBody() {
    const htmlBody = document.body;
    this.setState({ bodyCrop: !this.state.bodyCrop }, () => {
      htmlBody.style.overflow = this.state.bodyCrop ? 'hidden' : 'visible';
      htmlBody.style.height = this.state.bodyCrop
        ? `${window.innerHeight}px`
        : 'initial';
    });
  }
  toggleSlideshow(data) {
    this.cropBody();
    return this.state.slideshow === null
      ? this.setState({
          slideshow: data
        })
      : this.setState({ slideshow: null });
  }
  render() {
    // console.log("props: ", this.props); /* eslint no-console: 0 */
    // console.log("state: ", this.state); /* eslint no-console: 0 */
    return [
      <Init key="helmet" wpmeta={this.wpmeta} />,
      <Element key="cover" name="cover">
        <Cover
          carousel={this.wpCarousel}
          navigateTo={this.navigateTo}
          slugs={this.slugs}
        />
      </Element>,
      <Topbar
        key="topbar"
        navigateTo={this.navigateTo}
        slugs={this.slugs}
        sticky={this.state.stickynav}
        toggleOffcanvas={this.toggleOffcanvas}
      />,
      <main key="main">
        <Element name="biography">
          <Bio pushed={this.state.stickyNav} />
        </Element>
        {this.wpSections.map((obj) => {
          console.log(obj);
          const slug = obj.title.trim().toLowerCase();
          return (
            <Element key={slug} name={slug}>
              <NewSection cover={obj.background.source_url}>
                <Section valign="bottom">
                  <Container space>
                    <SectionTitle>{obj.title}</SectionTitle>
                    <Separator silent size="m" />
                    <SectionBody>
                      <SectionBlock>
                        <SectionIntro>{obj.text}</SectionIntro>
                        <Separator silent size="s" />
                        {obj.galleries.map((gallery) => [
                          <Separator silent size="x" key="separator" />,
                          <SectionAction
                            key={gallery.title}
                            onClick={() => this.toggleSlideshow(gallery)}
                          >
                            &gt; {gallery.title}
                          </SectionAction>
                        ])}
                      </SectionBlock>
                      <SectionBlock>
                        <CopyBlock>
                          <h2>{obj.aside}</h2>
                          <ul>
                            {obj.aside_list.map((detail, i) => (
                              <li key={i}>{detail.text}</li>
                            ))}
                          </ul>
                        </CopyBlock>
                      </SectionBlock>
                    </SectionBody>
                  </Container>
                </Section>
              </NewSection>
            </Element>
          );
        })}
        <Element name="contact">
          <Contact data={this.wpContact} />
        </Element>
      </main>,
      <Slideshow
        isActive={this.state.slideshow !== null}
        key="slideshow"
        gallery={this.state.slideshow}
        toggleSlideshow={this.toggleSlideshow}
      />,
      <Offcanvas
        key="offcanvas"
        isActive={this.state.offcanvas}
        navigateTo={this.navigateTo}
        slugs={this.slugs}
        toggleOffcanvas={this.toggleOffcanvas}
      />
    ];
  }
}

HomePage.propTypes = {
  data: shape({
    wpdata: object.isRequired,
    wpmeta: object.isRequired
  }).isRequired
};

HomePage.defaultProps = {};

export const pageQuery = graphql`
  query WpQuery {
    wpdata: allWordpressPage(filter: { wordpress_id: { eq: 140 } }) {
      edges {
        node {
          acf {
            content_page {
              __typename
              ... on WordPressAcf_cover {
                carousel {
                  localFile {
                    childImageSharp {
                      sizes(maxWidth: 1200) {
                        ...GatsbyImageSharpSizes_withWebp
                      }
                    }
                  }
                }
              }
              ... on WordPressAcf_section {
                text
                background {
                  source_url
                }
                title
                galleries {
                  title
                  slides {
                    id
                    type
                    title
                    description
                    caption
                    alt_text
                    media_type
                    media_details {
                      width
                      height
                      file
                    }
                    source_url
                  }
                }
                aside
                aside_list {
                  text
                }
              }
              ... on WordPressAcf_contact {
                background {
                  source_url
                }
                email
                intro
                location
                phone
                title
              }
            }
          }
        }
      }
    }
    wpmeta: allWordpressPage(filter: { wordpress_id: { eq: 140 } }) {
      edges {
        node {
          acf {
            title
            description
          }
        }
      }
    }
  }
`;
