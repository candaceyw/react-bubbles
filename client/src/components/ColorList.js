import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};



const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      updateColors([...colors.filter(color => color.id != colorToEdit.id), res.data])
      setEditing(false);
    })
    .catch(err => {
      console.error(err);
    })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    console.log(color);

    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(() => {updateColors([...colors.filter(item => item.id !== color.id)]);
    })
    .catch(err => {
      console.error(err);
    })
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/api/colors`, colorToAdd)
    .then(res => {
      updateColors(res.data);
    })
    .catch(err => {
      console.error(err);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              name='name'
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              name='code'
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* add color code here */}
            <form onSubmit={addColor} className="add-form">
               
              <div className="color-name">
               <label className="add-form" >
               Color Name: 
                <input
                  onChange={e =>
                    setColorToAdd({ ...colorToAdd, color: e.target.value })
                  }
                  name='name'
                  value={colorToAdd.color}
                /> </label> 
           </div>

                  <div className="hex-code">
                <label>
            Hex Code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              name='code'
              value={colorToAdd.code.hex}
            />
          </label>
          </div>

         
          <br/>
          <div className="button-row">
            <button type="submit">Add</button>
          </div>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;