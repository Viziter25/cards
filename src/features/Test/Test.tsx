import React, { useState } from 'react';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import { SuperInput } from '../../common/components/SuperInput/SuperInput';
import SuperCheckbox from '../../common/components/SuperCheckbox/SuperCheckbox';
import { SuperEditableSpan } from '../../common/components/SuperEditableSpan/SuperEditableSpan';
import SuperSelect from '../../common/components/SuperSelect/SuperSelect';
import SuperRadio from '../../common/components/SuperRadio/SuperRadio';
import SuperRange from '../../common/components/SuperRange/SuperRange';
import SuperDebouncedInput from '../../common/components/SuperDebouncedInput/SuperDebouncedInput';
import SuperPagination from '../../common/components/SuperPagination/SuperPagination';

export const Test = () => {

  const [stateForAllInputs, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [stateForAllCheckboxes, setChecked] = useState<boolean>(false)


  //Select
  const arr = [
    { id: 1, value: '1' },
    { id: 2, value: '2' },
    { id: 3, value: '3' },
  ] // value может быть изменено
  const [value, onChangeOption] = useState(1)

  return (
    <div>
      Test

      <div>
        Buttons
        {/*обычная кнопка:*/}
        <div>
          <SuperButton id={'hw4-super-button-default'}>
            default
          </SuperButton>
        </div>
        {/*красная кнопка:*/}
        <div>
          <SuperButton id={'hw4-super-button-red'} xType={'red'}>
            red
          </SuperButton>
        </div>
        {/*задизэйбленная кнопка:*/}
        <div>
          <SuperButton id={'hw4-super-button-disabled'} xType={'red'} disabled>
            disabled
          </SuperButton>
        </div>
        {/*задизэйбленная кнопка:*/}
        <div>
          <SuperButton id={'hw4-super-button-secondary'} xType={'secondary'}>
            secondary
          </SuperButton>
        </div>
      </div>

      <div>
        input
        <SuperInput
          id={'hw4-super-input-with-error'}
          value={stateForAllInputs}
          onChangeText={setValue}
          error={error}
          onEnter={() => {
            setError(stateForAllInputs.trim() ? '' : 'Error')
            setValue('')
          }}
        />
      </div>

      <div>
        Checkbox
        {/*чекбокс с текстом:*/}
        <div>
          <SuperCheckbox
            id={'hw4-super-checkbox-like-old'}
            checked={stateForAllCheckboxes}
            onChange={(e) => setChecked(e.currentTarget.checked)}
          />
        </div>
      </div>

      <div>
        <SuperEditableSpan
          // value={value}
          onChangeText={setValue}
          spanProps={{
            id: 'hw6-editable-span',
            defaultText: 'enter text...',
          }}
        />
      </div>

      Select
      <div>
        <SuperSelect
          id={'hw7-super-select'}
          options={arr}
          value={value}
          onChangeOption={onChangeOption}
        />
      </div>

      Radio
      <div>
        <SuperRadio
          id={'hw7-super-radio'}
          name={'hw7-radio'}
          options={arr}
          value={value}
          onChangeOption={onChangeOption}
        />
      </div>

      Range
      <SuperRange />

      <SuperDebouncedInput />
      Pagination
      <SuperPagination
        page={5}
        itemsCountForPage={5}
        totalCount={50}
        onChange={() => {
        }}
      />
    </div>
  );
};
