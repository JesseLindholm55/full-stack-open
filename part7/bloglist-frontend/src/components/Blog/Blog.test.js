import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content without likes and url', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        url: 'component.com',
        likes: 2,
        author: 'James West',
        user: {
            id: 123,
            name: 'James Cordon',
            username: 'El Jefe'
        }
    }

    render(<Blog key={blog.id} blog={blog} />)
    //console.log(screen)
    const main = screen.getByText(
        'Component testing is done with react-testing-library James West'
    )
    const url = screen.getByText('component.com')
    const likes = screen.getByText(2)
    expect(main).toBeDefined()
    expect(url).not.toBe('component.com')
    expect(likes).not.toBe(2)
})

test('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        url: 'component.com',
        likes: 2,
        author: 'James West',
        user: {
            id: 123,
            name: 'James Cordon',
            username: 'El Jefe'
        }
    }

    const mockHandlerList = jest.fn()
    const mockHandlerMessage = jest.fn()

    render(
        <Blog
            blog={blog}
            updateMessage={mockHandlerMessage}
            updateList={mockHandlerList}
        />
    )

    const user = userEvent.setup()
    const button = screen.getByText('Show additional information')
    await user.click(button)
    const url = screen.getByText('component.com')
    const likes = screen.getByText(2)

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
})
