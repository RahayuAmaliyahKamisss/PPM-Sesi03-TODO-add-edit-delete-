import { View, Text, Alert, TextInput, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';

const App = () => {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<any[]>([
    {
      id: 1,
      title: 'TODO?',
      completed: false,
    },
  ]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (!title) {
      return Alert.alert('Error', 'Please enter your todo');
    }

    if (isEditing) {
      // EDIT TODO: Update todo list
      const updatedTodos = todo.map((item) =>
        item.id === editId ? { ...item, title } : item
      );
      setTodo(updatedTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTodo = {
        id: todo.length + 1,
        title: title,
        completed: false,
      };
      setTodo([...todo, newTodo]);
    }
    setTitle('');
  };

  // DELETE TODO: Delete todo from the list
  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todo.filter((item) => item.id !== id);
    setTodo(updatedTodos);
  };

  // EDIT TODO: Set todo for editing
  const handleEditTodo = (item: any) => {
    setTitle(item.title);
    setIsEditing(true);
    setEditId(item.id);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#A79277', 
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          gap: 10,
        }}>
        <TextInput
          placeholder='Enter your todo'
          style={{
            flex: 1,
            borderColor: '#ECCA9C',
            borderWidth: 1,
            padding: 10,
          }}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          style={{
            backgroundColor: isEditing ? '#9B3922' : '#ECCA9C',
            padding: 10,
            borderRadius: 5,
            height: 40,
          }}
          onPress={handleAddTodo}>
          <Text
            style={{
              color: 'white',
            }}>
            {isEditing ? 'Update Todo' : 'Add Todo'}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={todo}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
              borderBottomWidth: 1,
              borderColor: 'grey',
              paddingBottom: 5,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
              }}>
              {item.title}
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable
                onPress={() => handleEditTodo(item)}
                style={{
                  backgroundColor: '#86AB89',
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Text style={{ color: 'white' }}>Edit</Text>
              </Pressable>
              {/* DELETE TODO: Pressable for delete action */}
              <Pressable
                onPress={() => handleDeleteTodo(item.id)}
                style={{
                  backgroundColor: '#9B3922',
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Text style={{ color: 'white' }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default App;
