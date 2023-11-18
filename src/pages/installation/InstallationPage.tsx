import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Auto {
  id: string;
  placa: string;
  marca: string;
  cantidad_pasajeros: string
  // Add other properties here if needed
}

const InstallationPage = () => {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [editAuto, setEditAuto] = useState<Auto | null>(null);
  const [deleteAuto, setDeleteAuto] = useState<string | null>(null);


  useEffect(() => {
    axios.get('https://backen-diplomado-51d51f42ca0d.herokuapp.com/autos/')
      .then((response) => {
        console.log(response.data);
        setAutos(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleEdit = (auto: Auto) => {
    setEditAuto(auto);
  };
  
  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (editAuto) {
      axios.put(`https://backen-diplomado-51d51f42ca0d.herokuapp.com/autos/${editAuto.id}`, editAuto)
        .then(response => {
          setAutos(autos.map(auto => auto.id === editAuto.id ? response.data : auto));
          setEditAuto(null);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  };
  
  const handleDelete = (id: string) => {
    setDeleteAuto(id);
  };
  
  const handleDeleteConfirm = () => {
    if (deleteAuto) {
      axios.delete(`https://backen-diplomado-51d51f42ca0d.herokuapp.com/autos/${deleteAuto}`)
        .then(response => {
          setAutos(autos.filter(auto => auto.id !== deleteAuto));
          setDeleteAuto(null);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  };


  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {autos.map((auto, index) => (
        <div key={index} style={{border: '1px solid black', margin: '10px', padding: '10px', width: '200px'}}>
          <h3>{auto.marca}</h3>
          <p>Placa: {auto.placa}</p>
          <p>Cantidad de pasajeros: {auto.cantidad_pasajeros}</p>
          <button onClick={() => handleEdit(auto)}>Editar</button>
          <button onClick={() => handleDelete(auto.id)}>Eliminar</button>
        </div>
      ))}
      {editAuto && (
        <div>
          <h2>Editar Auto</h2>
          <form onSubmit={handleUpdate}>
            <label>
              Marca:
              <input type="text" value={editAuto.marca} onChange={e => setEditAuto({...editAuto, marca: e.target.value})} />
            </label>
            <label>
              Cantidad de Pasajeros:
              <input type="text" value={editAuto.cantidad_pasajeros} onChange={e => setEditAuto({...editAuto, cantidad_pasajeros: e.target.value})} />
            </label>
            <label>
              Placa:
              <input type="text" value={editAuto.placa} onChange={e => setEditAuto({...editAuto, placa: e.target.value})} />
            </label>
            <button type="submit">Guardar</button>
            <button onClick={() => setEditAuto(null)}>Cancelar</button>
          </form>
        </div>
      )}
      {deleteAuto && (
        <div>
          <h2>¿Estás seguro de que quieres eliminar este auto?</h2>
          <button onClick={handleDeleteConfirm}>Sí</button>
          <button onClick={() => setDeleteAuto(null)}>No</button>
        </div>
      )}
    </div>
  );
}

export default InstallationPage;