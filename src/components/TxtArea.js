function TxtArea(props) {
    return (
      <div>
        <label htmlFor={props.id} className="form-label text-dark">
          {props.label}
        </label>
        <textarea
        rows={props.rows}
          className="form-control mb-3"
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          required={props.required}
          pattern={props.pattern}
          placeholder={props.placeholder}
        />
      </div>
    );
  }
  
  export default TxtArea;