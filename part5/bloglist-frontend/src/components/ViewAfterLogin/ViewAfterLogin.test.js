import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import ViewAfterLogin from './ViewAfterLogin'
import userEvent from '@testing-library/user-event'

test('renders content without likes and url', () => {
    const blogs = [
        {
            title: 'Component testing is done with react-testing-library',
            url: 'component.com',
            likes: 2,
            author: 'James West',
            user: {
                id: 123,
                name: "James Cordon",
                username: "El Jefe"
            }
        },
        {
            title: 'Component testing is done with react-testing-library part 2',
            url: 'component.net',
            likes: 125,
            author: 'James Hurricane',
            user: {
                id: 123,
                name: "James Cordon",
                username: "El Jefe"
            }
        }
    ]

    render(<ViewAfterLogin blogs={blogs} userName={'Kalevi Von Huutaja'} />)
    //console.log(screen)
    const main = screen.getByText('Component testing is done with react-testing-library James West')
    const url = screen.getByText('component.com')
    const likes = screen.getByText(2)
    expect(main).toBeDefined()
    expect(url).not.toBe('component.com')
    expect(likes).not.toBe(2)
})
