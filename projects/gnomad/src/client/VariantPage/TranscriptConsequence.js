import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { getCategoryFromConsequence } from '@broad/utilities'

import Link from '../Link'
import TranscriptConsequencePropType from './TranscriptConsequencePropType'

const AttributeName = styled.dt`
  display: inline;

  ::after {
    content: ': ';
  }
`

const AttributeValue = styled.dd`
  display: inline;
  margin: 0;
`

const AttributeList = styled.dl`
  display: flex;
  flex-direction: column;
  margin: 0;
`

const Attribute = ({ children, name }) => (
  <div>
    <AttributeName>{name}</AttributeName>
    <AttributeValue>{children}</AttributeValue>
  </div>
)

Attribute.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
}

const colors = {
  red: '#FF583F',
  yellow: '#F0C94D',
  green: 'green',
}

const lofteeAnnotationStyle = consequence => {
  switch (consequence.lof) {
    case 'HC':
      return { color: colors.green }
    case 'OS':
      return {}
    case 'LC':
    default:
      return { color: colors.red }
  }
}

const lofteeAnnotationDescription = consequence => {
  switch (consequence.lof) {
    case 'HC':
      return 'High-confidence'
    case 'OS':
      return 'Other splice (beta)'
    case 'LC':
      return `Low-confidence (${consequence.lof_filter})`
    default:
      return consequence.lof
  }
}

const TranscriptConsequenceDetails = ({ consequence }) => {
  const category = getCategoryFromConsequence(consequence.major_consequence)

  if (category === 'missense') {
    const polyphenColor =
      {
        benign: colors.green,
        possibly_damaging: colors.yellow,
      }[consequence.polyphen_prediction] || colors.red

    const siftColor = consequence.sift_prediction === 'tolerated' ? colors.green : colors.red

    return (
      <AttributeList>
        <Attribute name="HGVSp">{consequence.hgvs}</Attribute>
        {consequence.polyphen_prediction && (
          <Attribute name="Polyphen">
            <span style={{ color: polyphenColor }}>{consequence.polyphen_prediction}</span>
          </Attribute>
        )}
        {consequence.sift_prediction && (
          <Attribute name="SIFT">
            <span style={{ color: siftColor }}>{consequence.sift_prediction}</span>
          </Attribute>
        )}
      </AttributeList>
    )
  }

  if (
    // "NC" annotations were removed from the data pipeline some time ago.
    // Some ExAC variants still have them.
    consequence.lof === 'NC' ||
    (category === 'lof' && !consequence.lof) // See gnomadjs#364.
  ) {
    return (
      <AttributeList>
        <Attribute name="HGVSp">{consequence.hgvs}</Attribute>
        <Attribute name="pLoF">
          <span style={{ color: colors.red }}>Low-confidence (Non-protein-coding transcript)</span>
        </Attribute>
      </AttributeList>
    )
  }

  if (consequence.lof) {
    return (
      <AttributeList>
        <Attribute name="HGVSp">{consequence.hgvs}</Attribute>
        <Attribute name="pLoF">
          <span style={lofteeAnnotationStyle(consequence)}>
            {lofteeAnnotationDescription(consequence)}
          </span>
        </Attribute>
        {consequence.lof_flags && (
          <Attribute name="Flag">
            <span style={{ color: colors.yellow }}>{consequence.lof_flags}</span>
          </Attribute>
        )}
      </AttributeList>
    )
  }

  return null
}

TranscriptConsequenceDetails.propTypes = {
  consequence: TranscriptConsequencePropType.isRequired,
}

const TranscriptConsequence = ({ consequence }) => (
  <div>
    <Link to={`/gene/${consequence.gene_id}/transcript/${consequence.transcript_id}`}>
      {consequence.transcript_id}
      {consequence.canonical && ' *'}
    </Link>
    <TranscriptConsequenceDetails consequence={consequence} />
  </div>
)

TranscriptConsequence.propTypes = {
  consequence: TranscriptConsequencePropType.isRequired,
}

export default TranscriptConsequence
