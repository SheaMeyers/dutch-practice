import './Prepositions.css'

const Prepositions = () => {
  return (
    <div className="Prepositions">
      <p>Choose the correct preposition for the verb</p>
      <p>aanbeiden</p>
      <div className='Choices'>
        <button className='Choices__Button'>Op</button>
        <button className='Choices__Button'>Aan</button>
        <button className='Choices__Button'>Bij</button>
        <button className='Choices__Button'>Met</button>
      </div>
    </div>
  );
};

export default Prepositions;
