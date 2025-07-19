import './Prepositions.css'

const Prepositions = () => {
  return (
    <div className="Prepositions">
      <p>Choose the correct preposition for the verb</p>
      <p className='h3 Verb'>Aanbeiden</p>
      <div className='Choices'>
        <button className='btn btn-light Choices__Button' type="button">Op</button>
        <button className='btn btn-light Choices__Button' type="button">Aan</button>
        <button className='btn btn-light Choices__Button' type="button">Bij</button>
        <button className='btn btn-light Choices__Button' type="button">Met</button>
      </div>
    </div>
  );
};

export default Prepositions;
