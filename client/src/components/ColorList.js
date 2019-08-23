import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorEditor, setcolorEditor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setcolorEditor(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorEditor.id}`, colorEditor)
      .then(res => {
        console.log('edit',res);
        let tmp = colors.map(color=>{
          if(color.id===colorEditor.id){
            return res.data;
          } else {
            return color;
          }
        })
        updateColors(tmp);
      })
      .catch(err => console.log("error", err.response));
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res=>{
      console.log('delete', res)
      let tmp = colors.filter(col=>col.id!==color.id);
      updateColors(tmp);
    })
    // make a delete request to delete this color
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
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
                setcolorEditor({ ...colorEditor, color: e.target.value })
              }
              value={colorEditor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setcolorEditor({
                  ...colorEditor,
                  code: { hex: e.target.value }
                })
              }
              value={colorEditor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

// const addColor = () => {
//   setAdding(true);
//   setColorToEdit(initialColor);
// };

// const addColorToList = e => {
//   e.preventDefault();

// }


export default ColorList;
