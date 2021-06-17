import React from 'react';
import { PropTypes } from 'prop-types';
import { css } from 'emotion';
import { CloudProvider } from './constants-databricks';
import { FormattedMessage } from 'react-intl';

/**
 * Component that displays a cloud-conditional feedback link (typically a Google form link).
 * Disabled in Azure as Google is not an approved third-party data subprocessor in Azure Databricks.
 */
function CloudConditionalFeedbackLink({ link }) {
  // eslint-disable-next-line no-restricted-globals
  const shouldRender = top.settings && (top.settings.cloud === CloudProvider.AWS || top.settings.cloud === CloudProvider.GCP);
  if (shouldRender) {
    return (
      <a href={link} target='_blank' rel='noopener noreferrer' data-testid='feedback-link' className={css(styles.link)}>
        <FormattedMessage
          defaultMessage='Provide Feedback'
          description='Link to a survey for users to give feedback'
        />
      </a>
    );
  }
  return null;
}
CloudConditionalFeedbackLink.propTypes = { link: PropTypes.string.isRequired };

const styles = {
  link: {
    fontSize: 12,
    fontWeight: 500,
    textDecoration: 'none',
    lineHeight: '16px',
  },
};

export { CloudConditionalFeedbackLink };
