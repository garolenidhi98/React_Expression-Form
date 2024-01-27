import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const JsonOutput = ({ data }) => (
  <div className="json-output shadow p-3 mb-5 bg-body rounded">
    <h2 className="text-center">Output Data</h2>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

const App = () => {
  const [rules, setRules] = useState([
    { key: '', output: { value: '', operator: '>=', score: '' } },
  ]);

  const [combinator, setCombinator] = useState('and');
  const [jsonOutput, setJsonOutput] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAddRule = () => {
    setRules([...rules, { key: '', output: { value: '', operator: '', score: '' } }]);
    setJsonOutput(null); // Clear the JSON output when adding a rule
  };

  const handleDeleteRule = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
    setJsonOutput(null); // Clear the JSON output when deleting a rule
  };

  const handleInputChange = (index, field, value) => {
    const updatedRules = [...rules];
    if (field === 'output') {
      updatedRules[index].output = { ...updatedRules[index].output, ...value };
    } else {
      updatedRules[index][field] = value;
    }
    setRules(updatedRules);
    setJsonOutput(null); // Clear the JSON output when modifying the form
  };

  const handleCombinatorChange = (e) => {
    setCombinator(e.target.value);
    setJsonOutput(null); // Clear the JSON output when modifying the form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate an asynchronous process (replace with your actual data submission logic)
    setTimeout(() => {
      const processedRules = rules.map((rule) => ({
        key: rule.key,
        output: {
          value: parseInt(rule.output.value, 10),
          operator: rule.output.operator,
          score: parseInt(rule.output.score, 10),
        },
      }));

      const finalConfig = {
        rules: processedRules,
        combinator,
      };

      setJsonOutput(finalConfig);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="app-container d-flex flex-column" style={{ minHeight: '100vh' }}>
      <h2 className="text-center">Expression Form</h2>
      <Container className="flex-grow-1 mt-4">
        <Form onSubmit={handleSubmit}>
          {rules.map((rule, index) => (
            <Row key={index} className="mb-3">
              <Col>
                <Form.Group controlId={`ruleType-${index}`}>
                  <Form.Label className="fw-bold">Rule Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={rule.key}
                    onChange={(e) => handleInputChange(index, 'key', e.target.value)}
                  >
                    <option value="">Select Rule Type</option>
                    <option value="age">Age</option>
                    <option value="credit_score">Credit Score</option>
                    <option value="account_balance">Account Balance</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`operator-${index}`}>
                  <Form.Label className="fw-bold">Operator</Form.Label>
                  <Form.Control
                    as="select"
                    value={rule.output.operator}
                    onChange={(e) => handleInputChange(index, 'output', { operator: e.target.value })}
                  >
                    <option value=">">{'>'}</option>
                    <option value="<">{'<'}</option>
                    <option value=">=">{'>='}</option>
                    <option value="<=">{'<='}</option>
                    <option value="=">{'='}</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`value-${index}`}>
                  <Form.Label className="fw-bold">Value</Form.Label>
                  <Form.Control
                    type="text"
                    value={rule.output.value}
                    onChange={(e) => handleInputChange(index, 'output', { value: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`score-${index}`}>
                  <Form.Label className="fw-bold">Score</Form.Label>
                  <Form.Control
                    type="text"
                    value={rule.output.score}
                    onChange={(e) => handleInputChange(index, 'output', { score: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => handleDeleteRule(index)}>
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
          <div className="text-center p-3">
            <Form.Group controlId="combinator" className="mb-3">
              <Form.Label className="fw-bold">Combinator</Form.Label>
              <Form.Control as="select" value={combinator} onChange={handleCombinatorChange} size="sm">
                <option value="and">AND</option>
                <option value="or">OR</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleAddRule} size="sm" className="me-2">
              Add Expression
            </Button>
            <Button variant="success" type="submit" size="sm" disabled={submitting}>
              {submitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
          </div>
        </Form>
      </Container>
      <Container className="json-container mt-4">
        {jsonOutput && <JsonOutput data={jsonOutput} />}
      </Container>
    </div>
  );
};

export default App;
 


 


 